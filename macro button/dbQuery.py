from pymongo import MongoClient

def queryMongoDB():
   try:
      client = MongoClient("mongodb://302cem:nE9gX8Vb@ds233238.mlab.com:33238/302cem")
      db = client["302cem"]
      queryResp = db.co2.find({}, {'location': 1, 'reading': 1, 'created_at': 1, '_id': 0})

      printStr = "Location,Reading,Date created,"
      print(printStr)

      if queryResp.count() > 0 :
         n = 0
         for row in queryResp:
            printStr = ""
            
            if 'location' in row:
               printStr = row['location'] + ","
            else:
               printStr = ","
               
            if 'reading' in str(row):
               printStr = printStr + row['reading'] + ","
            else:
               printStr = printStr + ","
               
            if 'created_at' in str(row):
               printStr = printStr + str(row['created_at']) + ","
               
            print(printStr)
            n += 1
      else:
         print("Nothing's there")
         return -2
      return 0
   except ImportError:
      return -1

queryMongoDB()
