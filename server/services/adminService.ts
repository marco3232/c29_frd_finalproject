import { Knex } from "knex";

export class AdminService {
  public constructor(private knex: Knex) {}
  table() {
    return this.knex("users");
  }

  async adminCheckInConfirm(logisticsId: number) {
    try {
      return await this.knex("logistic_items").select("*")
      .join ("donate_items", "donate_items.id", "logistic_items.donate_item_id",)
      .where("logistic_id", logisticsId)
    } catch (e) {
      throw new Error(`Error fetching items:${e}`);
    }   
  }





  async logisticsOrder() {
    try {
      const sql = `
      with details as (
        select logistic_id, json_agg(donate_items.item_name ||  ' X '  || logistic_items.qty) as details from logistic_items 
        inner join  donate_items on donate_items.id = logistic_items.donate_item_id
        group by logistic_id
      ),
       items as (
        select logistic_id from logistic_items group by logistic_items.logistic_id
      )
      select details.logistic_id, details.details ,
      l.contact_name as name
  , l.contact_number as number
      ,l.room || ', ' || l.building ||  ', ' || l.street ||  ', ' || l.district as address,
      l.uuid as uuid
      , l.purpose as purpose
       , l.confirmed_date as confirmed_date
    , l.confirmed_session as confirmed_session
    , u.email as email
       from items 
       left join details on details.logistic_id = items.logistic_id
       inner join logistics l on l.id = items.logistic_id
        inner join users u on u.id = l.user_id
      `
      const infoQuery = await this.knex.raw(sql)
  //     const infoQuery = await this.knex.raw(`select
  //     di.item_name||  ' X ' || li.qty as item_details
  //    , l.uuid as uuid
  // , l.id as logistic_id
  // , l.contact_name as name
  // , l.contact_number as number
  // , l.room || ', ' || l.building ||  ', ' || l.street ||  ', ' || l.district as address
  // , u.email as email
  //     , l.purpose as purpose
  //   , l.district as district
  //   , l.confirmed_date as confirmed_date
  //   , l.confirmed_session as confirmed_session
  //     from logistic_items li 
  //     inner join logistics l on l.id = li.logistic_id
  //     inner join users u on u.id = l.user_id
  //     inner join donate_items di on di.id = li.donate_item_id`)
    
      
      
      // ("logistics").select("*")
      //   .join("users", "logistics.user_id", "users.id")



  
        
      console.log("march answer:", infoQuery);

      return infoQuery;
    } catch (e) {
      throw new Error(`Error fetching items:${e}`);
    }   
  }

  // async logisticsItem(logisticsId: number) {
  //   try {
  //     return await this.knex("logistic_items").select("*")
  //     .join("donate_items", "donate_items.id", "logistic_items.donate_item_id")
  //     .where("logistic_id", logisticsId)
  //   } catch (e) {
  //     throw new Error(`Error fetching items:${e}`);
  //   }   
  // }

}

