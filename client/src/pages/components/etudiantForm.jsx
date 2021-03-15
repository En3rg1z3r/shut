import {useState} from 'react';
import EtudiantTable from '../../apis/etudiantApi'; 
import {useContext} from 'react';
import {EtudiantContext} from '../../context/context';

const EtudiantForm = ()=>{
    const [matricule, setMatricule] =  useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [groupe, setGroupe] = useState("");
    const [section, setSection] = useState("");

    const {ajouterEtudiant} = useContext(EtudiantContext);

    const handleSubmit = ()=>{
                EtudiantTable.post("/createEtudiant",
                {    
                    matricule,
                    nom,
                    prenom,
                    groupe,
                    code_section:section
                }).then(ajouterEtudiant({
                    matricule,
                    nom,
                    prenom,
                    groupe,
                    code_section:section
                })).catch((e)=>console.log(e));    
            }
    
    
    return(
        <div className=" mt-4 mb-4">
                <h1>Remplissez les champs pour ajouter un Etudiant</h1>
                <input type="text" value={matricule} onChange={(e)=>{setMatricule(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le matricule"/>
                <input type="text" value={nom} onChange={(e)=>{setNom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le nom"/>
                <input type="text" value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le prenom"/>
                <input type="text" value={groupe} onChange={(e)=>{setGroupe(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le groupe"/>
                <input type="text" value={section} onChange={(e)=>{setSection(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le code de la section"/>
                <button className="btn btn-success" onClick={()=>{if(window.confirm("Etes vous sure ?"))handleSubmit()}}>Valider</button>
        </div>
    );
}

export default EtudiantForm;