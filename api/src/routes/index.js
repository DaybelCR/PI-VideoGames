const { Router } = require('express');
// const Videogame = require('../models/Videogame');
const {getAllGames,getGamesDB,getGamesApiById,getGenresApi,getPlatformsApi} =require('../controllers')
const {  Videogame,Genre,Platform} = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
  
    
    router.post('/videogames',async(req,res)=>{
    const { name, description, released, rating, platforms, image, genres } =
      req.body
    try {
      let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        image
      });
      const genresDb = await Genre.findAll({ where: { name: genres } });
      videogameCreated.addGenre(genresDb);
      const platformsDb =await Platform.findAll({ where: { name: platforms } })
      videogameCreated.addPlatform(platformsDb);

      return res.json({message:"VideoGame created ,successfully"});
    } catch (e) {
      res.status(500).json({message:e.message});
    }
    })
    
    router.get('/videogames',async(req,res)=>{
        const data= await getAllGames();
        const {name}=req.query;
        try{
          if(name){
            const filterData=data.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()));
            return filterData.length>0? res.json(filterData):res.json({message:'The name is not registered'});
            } else{
            return res.json(data);
            } 
        }catch(e){
           return res.status(500).json({message:e.message});
        }
    
    })

    router.get('/videogame/:id',async(req,res)=>{
      const{id}=req.params;
      if(!id) return res.status(404).json({message:'Falta completar el parámetro'});
      try{
        if(id.includes('-')){
            let videogame=await getGamesDB();
            const videogameFound=videogame.find(e=>e.id===id);
            return res.json( videogameFound);
         }else{
            return res.json(await getGamesApiById(id));
         }
      }catch(e){
       return res.status(500).json({message:e.message})
      }
       
    })

    router.get('/genres',async(req,res)=>{ 
      try {
        const allGenres = await getGenresApi();
        const arrayGenres = await Genre.findAll();
        if (!arrayGenres.length) {
          await Genre.bulkCreate(allGenres);
        }
        return res.json(arrayGenres);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    })

    router.get('/platforms',async(req,res)=>{
      try{
       let allPlatforms=await getPlatformsApi();
       const arrayPlatforms=await Platform.findAll();
       if(!arrayPlatforms.length){
        allPlatforms.forEach(platf=>{
          Platform.findOrCreate({where:{name:platf}})
        })
       }
       return res.json(arrayPlatforms);
      }catch(e){
        return res.status(500).json({ message: e.message });
      }
    })

module.exports = router;
 