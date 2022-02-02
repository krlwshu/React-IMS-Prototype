/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
const express = require('express');
// const promise = require('await-callback')
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8888;

app.use(cors());
// app.use(express.json);

const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  user: 'res_api',
  host: 'localhost',
  password: '@#Kptv8@#123',
  database: 'res_mgr',
});


//////////////////
//
// Resource Creation & Skill management Functions
//
const createUser = (body) => {
  const {
    name,
    email,
    title,
    pri_contact_no,
    sec_contact_no,
    contract_type,
    country,
    region,
    comments,
    management_co,
    co_type,
  } = body;

  return new Promise((resolve, reject) => {
    const status = { action: 'Create Resource', process_status: 'info', resp_text: '' };

    db.query('insert into res (name, email, title, pri_contact_no, sec_contact_no, contract_type, country, region, comments, management_co, co_type) values (?,?,?,?,?,?,?,?,?,?,?)',
      [name,
        email,
        title,
        pri_contact_no,
        sec_contact_no,
        contract_type,
        country, region,
        comments, management_co,
        co_type],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        status.process_status = 'success';
        status.resp_text = 'Resource Created';
        status.id = results.insertId;
        return resolve(status);
      });
  });
};

const createSkills = (id, skillData) => new Promise((resolve, reject) => {
  const status = { action: 'Add Skills', process_status: 'info', resp_text: '' };
  if (skillData.length > 0) {
    const skillsArr = skillData.split(',');
    let sql = 'INSERT INTO `res_mgr`.`comp_tag_data` (`res_id`, `comp_tag_id`) VALUES ';
    skillsArr.map(
      (i) => sql += `('${id}', '${i - 3000}'),`,
    );
    sql = sql.replace(/,\s*$/, '');
    db.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      status.resp_text = `${results.affectedRows} skills added`;
      status.process_status = 'success';
      return resolve(status);
    });
  } else {
    status.resp_text = 'No skills added, you can add them later';
    return resolve(status);
  }
});

const processFiles = (id, files) => new Promise((resolve, reject) => {
  const status = { action: 'CV Upload', process_status: 'info', resp_text: 'No Files to upload' };

  if (files === null) {
    return resolve(status);
  }

  let cv_path = '';
  let fName = false;

  const uplFile = files.file;
  fName = uplFile.name.replace(/\s/g, '_');
  const uploadPath = `${__dirname}/uploads/cv_data/${fName}`;
  cv_path = fName;
  const sql = `update res set cv_path = '${cv_path}' where id = ${id}`;

  if (uplFile.mv(uploadPath)) {
    status.uploaded = true;
    db.query(sql, (error, res) => {
      if (error) {
        return reject(error);
      }
      status.resp_text = `File uploaded. ${(res)}`;
      status.process_status = 'success';
      return resolve(status);
    });
  } else {
    status.resp_text = 'Unable to upload file';
    return reject(status);
  }
});

app.post('/newRes', async (req, res) => {
  try {
    const user = await createUser(req.body);
    const skills = await createSkills(user.id, req.body.checkedData);
    const uploaded = await processFiles(user.id, req.files);
    res.status(200).json([user, skills, uploaded]);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post('/getRes', (req, res) => {
  db.query('select * from res', (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/deleteSkill', (req, res) => {
  const { id } = req.body;
  const sql = 'delete from comp_tag_data where id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      res.send({ status: false, text: 'Something went wrong... ' });
    } else {
      res.send({ status: true, text: `Skill Deleted! ${results.affectedRows}` });
    }
  });
});

app.post('/getSkills', (req, res) => {
  const sql = `SELECT "root" AS label, 1 AS value, NULL AS parent UNION
    SELECT cd.domain AS item, cd.id + 1000 AS id, 1 AS parent
    FROM comp_domain cd
    JOIN comp_subdomain sd ON cd.id = sd.parent_domain UNION
    SELECT sd.sub_domain AS item, sd.id + 2000 AS id, parent_domain + 1000 AS parent
    FROM comp_subdomain sd
    JOIN comp_tags ct1 ON sd.id = ct1.parent_subdomain UNION
    SELECT tag AS item, id + 3000 AS id, parent_subdomain + 2000 AS parent
    FROM comp_tags
     `;

  function tree(data) {
    const idMapping = data.reduce((acc, el, i) => {
      acc[el.value] = i;
      return acc;
    }, {});

    let root;
    data.forEach((el) => {
      if (el.parent === null) {
        root = el;
        return;
      }
      const parentEl = data[idMapping[el.parent]];
      parentEl.children = [...(parentEl.children || []), el];
    });
    return root;
  }

  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(tree(result));
    }
  });
});

// Profile data

const getProfile = (id) => new Promise((resolve, reject) => {
  db.query('select * from res where id=? limit 1',
    [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});

const getAssignments = (id) => new Promise((resolve, reject) => {
  const sql = `SELECT CONCAT( left(MONTHNAME(ra.start),3) , " '",right(YEAR(ra.start), 2)) AS time, 
        ra.title, 
        ra.desc, 
        ra.actual_end as end, 
        ra.id_res,
        r.avatar,
        r.name,
        r.role
        fROM res_assignments ra
        LEFT JOIN res r ON 
        r.id = ra.id_res
        WHERE 
        ra.id_proj IN (SELECT id_proj FROM res_assignments WHERE id_res = ?)  
        order by 1 desc`;

  db.query(sql,
    [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});

const getCompTagData = (id) => new Promise((resolve, reject) => {
  const sql = `SELECT 
        ctd.id,
        ct.tag,
        sd.sub_domain,
        cd.domain
        FROM comp_tag_data ctd 
        LEFT JOIN comp_tags ct ON ctd.comp_tag_id = ct.id
        LEFT JOIN comp_subdomain sd ON  sd.id = ct.parent_subdomain
        LEFT JOIN comp_domain cd ON cd.id = sd.parent_domain
        WHERE res_id = ?`;

  db.query(sql,
    [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});

app.post('/userProfile', async (req, res) => {
  try {
    const profile = await getProfile(req.body.id);
    const assign = await getAssignments(req.body.id);
    const comp_tag_data = await getCompTagData(req.body.id);
    res.status(200).json({ profile: profile[0], assignments: assign, comp_tag_data });
  } catch (e) {
    res.sendStatus(500);
  }
});

//////////////////
//
// Dashboard data
//


const getDashStats = () => new Promise((resolve, reject) => {
  const sql = `SELECT   CASE WHEN actual_end IS null THEN 'active' ELSE 'completed' END AS name,
  COUNT(*) AS value
  FROM res_assignments
  GROUP BY 1
  -- Contracts ending 30 days
  UNION 
  SELECT 
  'ending_30' AS NAME,
  COUNT(*) AS value FROM res_assignments WHERE planned_end
  BETWEEN CURRENT_DATE()
  AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY) 
  -- Contracts ending 60 days
  UNION 
  SELECT 
  'ending_60' AS NAME,
  COUNT(*) AS value FROM res_assignments WHERE planned_end
  BETWEEN CURRENT_DATE()
  AND DATE_ADD(CURRENT_DATE(), INTERVAL 60 DAY) 
  -- Registered skills:
  UNION 
  SELECT 
  'tot_reg_skills' AS NAME,
  COUNT(*) FROM comp_tag_data AS value
  -- % of active resources with skills registered
  UNION 
  SELECT 'perc_act_user_w_reg_skills' AS name,
  CASE WHEN (select count(DISTINCT(res_id)) FROM comp_tag_data) >= 1 THEN 
  (SELECT((SELECT count(DISTINCT(id)) FROM res) * ((select count(DISTINCT(res_id)) FROM comp_tag_data)  / (select COUNT(id) FROM res WHERE active_status = 'active'))))
   ELSE 0 END AS name
   -- Get Projects
   UNION 
   SELECT CASE WHEN project_end IS null THEN 'project_active' ELSE 'project_completed' END AS name,
   COUNT(*) AS value
   from projects GROUP BY 1
  `;

  db.query(sql,
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});




const getActRes = () => new Promise((resolve, reject) => {
  const sql = `SELECT 
  CASE WHEN active_status NOT IN ('active','inactive') THEN 'other' ELSE active_status END AS name,
  COUNT(*) AS value FROM res GROUP BY 1`;
    
  db.query(sql,
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});


const getResAssignedToProj = () => new Promise((resolve, reject) => {
  const sql = `SELECT p.project_name AS name, COUNT(*) AS value FROM res_assignments ra
  LEFT JOIN projects p ON ra.id_proj = p.id_project
  -- WHERE p.project_end IS NOT null
  GROUP BY 1`;
    
  db.query(sql,
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});


const getProjects = () => new Promise((resolve, reject) => {
  const sql = `SELECT 
  id_project,
  project_name,
  project_summary,
  client,
  project_avatar
  FROM projects`;
    
  db.query(sql,
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});



app.post('/dashData', async (req, res) => {
  try {
    const actAssignments = await getDashStats();
    const actRes = await getActRes();
    const projRes = await getResAssignedToProj();
    const projects = await getProjects();
    res.status(200).json({ actAssignments, actRes, projRes,projects });
  } catch (e) {
    res.sendStatus(500);
  }
});

//////////////////
//
// Auth User#
//

const verifyUser = (email) => new Promise((resolve, reject) => {
  const sql = "select email, active from sys_users where email = ? limit 1";
  db.query(sql, [email],
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});


app.post('/verify', async (req, res) => {
  const email  = req.body.email;
  console.log("called");
  try {
    const authStatus = await verifyUser(email);
    if(authStatus.length === 1){      
      res.status(200).json(Boolean(authStatus[0].active));
    } 
    else {
      res.status(200).json(false);
    }
    
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Running');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Prod server listening at http://localhost:${port}`);
});



//////////////////
//
// Generic DB query function
//

const runQuery = (sql) => new Promise((resolve, reject) => {
  db.query(sql,
    (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
});

//////////////////
//
// Skills Matrix functions
//

app.post('/getMatrixData', async (req, res) => {
  try {

    let matrixDataSQL = `SELECT  r.id, r.name,  CONCAT("L3_", ctd.comp_tag_id) AS 'skill_item'  FROM res r 
    LEFT JOIN  comp_tag_data ctd ON r.id = ctd.res_id`;
    let matrixHeaderSQL = `SELECT "root" AS 'Header', "root" AS accessor, NULL AS parent UNION
        SELECT cd.domain AS item, concat("L1_",cd.id) AS id, "root" AS parent
        FROM comp_domain cd
        JOIN comp_subdomain sd ON cd.id = sd.parent_domain UNION
        SELECT sd.sub_domain AS item, CONCAT("L2_",sd.id), CONCAT("L1_",parent_domain) AS parent
        FROM comp_subdomain sd
        JOIN comp_tags ct1 ON sd.id = ct1.parent_subdomain UNION
        SELECT tag AS item, CONCAT("L3_", id), CONCAT("L2_", parent_subdomain) AS parent
        FROM comp_tags`

    //Get header data from db and create object tree
    let headersRaw = await runQuery(matrixHeaderSQL);
    let treeHeaderData = createMatrixHeaderTree(headersRaw);

    // Inject Name
    // treeHeaderData.push({Header:"Name",accessor: "name"})


    //Get data from db and create skills data format
    let dataRaw = await runQuery(matrixDataSQL);
    let userData = createMatrixData(dataRaw);
    

    res.status(200).json({ treeHeaderData, userData });
  } catch (e) {
    res.sendStatus(500);
  }
});

function createMatrixHeaderTree(data) {
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.accessor] = i;
    return acc;
  }, {});

  let root;
  data.forEach((el) => {
    if (el.parent === null) {
      root = el;
      return;
    }
    const parentEl = data[idMapping[el.parent]];
    parentEl.columns = [...(parentEl.columns || []), el];
  });
  return root;
}

function createMatrixData(data) {

  const distNames = [...new Set(data.map(item => item.name))];
  let userArr = [];
  
  for (const name of distNames) {  
    let userObj = {};
    userObj['name'] = name
    // For data records
    for (const [key, item] of Object.entries(data)) {
      if (item.name === name && item.skill_item !== null){
        userObj[item.skill_item] = "Y"
  
      }
    }
    userArr.push(userObj); 
  }

  return userArr;

}


// CV List


// app.post('/getCvs', async (req, res) => {
//   try {
//     let cvListSQL = `
//     SELECT cv.id, cv.filename, cv.path, r.name FROM cv_list cv 
//     LEFT JOIN res r ON cv.res_id = r.id
//     WHERE r.cv_path IS NOT null
//     AND r.name IS NOT null
//     `;
//     //Get header data from db and create object tree
//     let cvList = await runQuery(cvListSQL);
//     res.status(200).json({ cvList });
//   } catch (e) {
//     res.sendStatus(500);
//   }
// });


app.post('/getCvs', (req, res) => {

  let cvListSQL = `
  SELECT cv.id, cv.filename, cv.path, r.name, cv.date_uploaded FROM cv_list cv 
  LEFT JOIN res r ON cv.res_id = r.id
  WHERE r.cv_path IS NOT null
  AND r.name IS NOT null
  `;

  db.query(cvListSQL, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});