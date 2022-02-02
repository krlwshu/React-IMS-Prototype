#import sample telco product data

import pandas as pd
dataFrame   = pd.DataFrame(data=df)
from sqlalchemy import create_engine
df = pd.read_csv('Sample Products.csv')
tableName = "products"
sqlEngine       = create_engine('mysql+pymysql://root:@127.0.0.1/ims_proto', pool_recycle=3600)
dbConnection    = sqlEngine.connect()
dataFrame.to_sql(tableName, dbConnection, if_exists='append', index=False);