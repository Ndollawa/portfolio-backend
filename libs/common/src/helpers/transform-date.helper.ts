import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

// Convert Google Protobuf Timestamp to JavaScript Date
export function timestampToDate(timestamp: Timestamp): Date {
    const milliseconds = timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000000;
    return new Date(milliseconds);
}

// Convert JavaScript Date to Google Protobuf Timestamp
export function dateToTimestamp(date: Date): Timestamp {
    const timestamp = new Timestamp();
    timestamp.setSeconds(Math.floor(date.getTime() / 1000));
    timestamp.setNanos(date.getMilliseconds() * 1000000);
    return timestamp;
}


export const transformDateToTimestamp = (object: any) =>{
  if (!object) return null;
  const  newObj = {
        ...object,
        createdAt:  object.createdAt instanceof Date ? dateToTimestamp(object.createdAt) : null,
        updatedAt:  object.updatedAt instanceof Date ? dateToTimestamp(object.updatedAt) : null,
  }
    return newObj;
}

export const transformTimestampToDate = (object: any) =>{
          // Check if object is empty
  if (!object) return null; 
  const  newObj = {
        ...object,
        createdAt: object.createdAt instanceof Date ? timestampToDate(object.createdAt) : null ,
        updatedAt: object.updatedAt instanceof Date ? timestampToDate(object.createdAt) : null ,
  }
    return newObj;
}