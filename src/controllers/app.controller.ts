import { Controller, Get } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { exit } from 'process';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // return 'hello world';
  }

  

  @Get('/messages')
  async getMessages(): Promise<any> {

    let result: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
    let posts = result.data;

    let response = []

    for(let id of posts) {

      let {data} = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  
      response = [...response, data]
    }

    return{
      response
    }
  }

  
// To get last last 25 stories

  @Get('/last25stories')
  async getlast25stories(): Promise<any> {

    let result: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
    let posts = result.data;

    let response = []

      let  count = 0;
      for(let id of posts) {
        // Increment variable by 1
        count++;

        let {data} = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  
      response = [...response, data.title]
     
      
      if (count == 25){
							   break;
						 }
      }
      return response; 


    //   const hashmap = response.reduce( (acc, val) => {
    //     acc[val] = (acc[val] || 0 ) + 1
    //     return acc
    //  },{})
    // return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)

      // return response.length;


  }


  
// To get last 600 stories

@Get('/last600stories')
async gelast600stories(): Promise<any> {

  let result: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
  let posts = result.data;

  let response = []

    let  count = 0;
    for(let id of posts) {
      // Increment variable by 1
      count++;

      let {data} = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    response = [...response, data]
   
    
    if (count == 10){
               break;
           }
    }
    return response; 


}


// To get last week post

@Get('/lastWeekPost')
async gellastWeekPost(): Promise<any> {

  let result: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/updates.json?print=pretty`);
  let posts = result.data.items;

  let response = []

  // return posts;

    let  count = 0;
    for(let id of posts) {
      // Increment variable by 1
      count++;

      let {data} = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    response = [...response, data]
   
    
    if (count == 10){
               break;
           }
    }
    return response; 


}


  @Get('/allPost')
  async getallPost(): Promise<any> {

    let result: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
    let posts = result.data;

    console.log('posts');

    return posts;

  }


  


  


}
