require("dotenv").config();
const  express = require("express");
const app = express();
const db = require("./db/dbConfig");
const cors = require("cors");
app.use(cors());
app.use(express.json());



//---------------------------------------------------------------------ETUDIANT MANIPULATION
app.get("/getEtudiants",async (req,res)=>{
    try {
        const results = await db.query("SELECT * FROM ETUDIANT");
        res.json({
        dataLength: results.rowCount,
        data:results.rows
    });
    } catch (e) {
        console.error(e);
    }
})


app.get("/getEtudiant:matricule",async (req,res)=>{
    try {
        const results = await db.query(
            "SELECT * FROM ETUDIANT WHERE ETUDIANT.MATRICULE =$1",
            [req.params.matricule]);
        res.json({
            dataLength:results.rowCount,
            data:results.rows
        })
    } catch (e) {
        console.error(e);
    }
})


app.post("/createEtudiant", async (req,res)=>{
    try {
        await db.query(
            "INSERT INTO etudiant(matricule , nom, prenom, code_section, groupe) VALUES ($1,$2,$3,$4,$5)",
            [
            req.body.matricule, 
            req.body.nom,
            req.body.prenom,
            req.body.code_section,
            req.body.groupe
            ]
        )
    
    } catch (e) {
        console.error(e);
    }
})

app.put("/updateEtudiant:matricule", async (req,res)=>{
   try {
    await db.query(
        "UPDATE ETUDIANT SET nom=$1, prenom=$2, code_section=$3, groupe=$4 WHERE matricule=$5",
        [
        req.body.nom,
        req.body.prenom,
        req.body.code_section,
        req.body.groupe,
        req.params.matricule
        ]
    )
   } catch (e) {
       console.error(e);
   }
})

app.delete("/deleteEtudiant:matricule", async (req,res)=>{
    try {
        await db.query(
            "DELETE FROM ETUDIANT WHERE ETUDIANT.MATRICULE=$1",
            [req.params.matricule]);
    } catch (e) {
        console.error(e);
    }
});
//-------------------------------------------------------------------------------------END_ETUDIANT MANIPULATION



//-------------------------------------------------------------------------------------MODULE MANIPULATION

app.get("/getModules",async (req,res)=>{
    try {
        const results = await db.query("SELECT * FROM module");
        console.log(results);
        res.json({
        dataLength: results.rowCount,
        data:results.rows
    });
    } catch (e) {
        console.error(e);
    }
})


app.get("/getModule:codemodule",async (req,res)=>{
    try {
        const results = await db.query(
            "SELECT * FROM MODULE WHERE MODULE.CODE_MODULE =$1",
            [req.params.codemodule]);
        res.json({
            dataLength:results.rowCount,
            data:results.rows
        })
    } catch (e) {
        console.error(e);
    }
})


app.post("/createModule", async (req,res)=>{
    try {
        await db.query(
            "INSERT INTO module(code_module , nom_module, coefficient) VALUES ($1,$2,$3)",
            [
            req.body.code_module, 
            req.body.nom_module,
            req.body.coefficient,
            ]
        )
    
    } catch (e) {
        console.error(e);
    }
})

app.put("/updateModule:codemodule", async (req,res)=>{
   try {
    await db.query(
        "UPDATE module SET nom_module=$1, coefficient=$2 WHERE code_module=$3",
        [
        req.body.nom_module,
        req.body.coefficient,
        req.params.codemodule
        ]
    )
    console.log(req.params.codemodule);

   } catch (e) {
       console.error(e);
   }
})

app.delete("/deleteModule:codemodule", async (req,res)=>{
    try {
        await db.query(
            "DELETE FROM module WHERE module.code_module=$1",
            [req.params.codemodule]);
    } catch (e) {
        console.error(e);
    }
});


const port = process.env.PORT;
app.listen(port,()=>console.log(`server running on port ${port}`));

