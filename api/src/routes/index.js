require('dotenv').config();
const{API_KEY}=process.env;

const axios=require('axios');
const { Router } = require('express');
// const Videogame = require('../models/Videogame');

const {  Videogame,Genre  } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
  
   const getGamesApi=async()=>{
    let urls=[1,2,3,4,5].map((pag)=> axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pag}`));
    let  arrayResponse=[];
    const getALL=await Promise.all(urls); // console.log(getALL[0].data.results[19].name)
    for(let url of getALL){  
     result=url.data.results.map(r=>{return{
        id:r.id,
        name:r.name,
        released:r.released,
        image:r.background_image,
        rating: r.rating,
        genres: r.genres.map(g=>{return{id:g.id,name:g.name}})
    }})
     arrayResponse=[...arrayResponse,...result];
    }
        return arrayResponse;
   }

    const getGamesDb=async()=>{
       const dataDb=await Videogame.findAll({
        include:{model:Genre,
                  attributes:['name']},
                  through:{
                    attributes:['id']
                  }
       })
       return dataDb;
    }

    const getAllGames=async()=>{
    const first=await getGamesApi();
    const second=await getGamesDb();
    return [...first,...second];
    }
    const getGenresApi=async()=>{
     const genreData=await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
     const result= await genreData.data.results.map(r=>{
         return {
             id:r.id,
             name:r.name
         }
     })
     return result;
}

    const getGamesApiById=async(id)=>{
    const {data}=await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const obj= {
        id: data.id,
        name:data.name,
        released:data.released,
        rating:data.rating,
        description:data.description.replace(/(<([^>]+)>)/gi, ""),
        image:data.background_image,
        platforms: data.platforms.map(p=>p.platform.name),
        genres:data.genres.map(g=>g.name),      
       }
    return obj;
    }

    
    router.post('/videogames',async(req,res)=>{
    const {name,description,released,rating,platforms,image,genres}=req.body;
    if(!name||!description||!released||!rating||platforms.length===0||!image||genres.length===0) return res.status(404).send('Falta enviar datos');
            try{
              const newGame=await Videogame.create({
                name,description,released,rating,platforms,image
              });
             const genreFound=await Genre.findAll({where:{name:genres}});
             newGame.addGenre(genreFound);
            return res.send('VideoGame created ,successfully');
            }catch(e){
             res.status(404).send('Algún error en los datos provistos');
            }
    })

    router.get('/videogames',async(req,res)=>{
        const data= await getAllGames();
        const {name}=req.query;
        if(name){
        const filterData=data.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()));
        // const filterData= data.filter(d=>d.name.toLowerCase().indexOf(name.toLowerCase())!==-1)
        return filterData.length>0? res.json(filterData):res.send('No existe alguna coincidencia');
        } else{
        return res.json(data);
        } 
    })

    router.get('/videogame/:id',async(req,res)=>{
      const{id}=req.params;
      if(!id) return res.status(404).send('Falta completar el parámetro');
      try{
        if(id.includes('-')){
            const datos=await Videogame.findByPk(id,{include:{model:Genre, attributes:['name']}});
            return res.json( datos);
         }else{
            return res.json(await getGamesApiById(id));
         }
      }catch(e){
        console.log(e);
      }
       
    })

    router.get('/genres',async(req,res)=>{ 
    const genres=await getGenresApi(); // [{i:54,name:action},{id:38,name:adventure},...]
     genres.forEach(element => {
        Genre.findOrCreate(
            {where:
                {id:element.id,name:element.name}
            })
     });
    const all= await Genre.findAll();
    return res.json(all);
    })

module.exports = router;
 