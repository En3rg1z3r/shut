import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import EtudiantTable from '../../apis/etudiantApi'

const ModifierEtudiant = ()=>{
    let {matricule} = useParams();
    let history = useHistory();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [groupe, setGroupe] = useState("");
    const [section, setSection] = useState("");
    
    useEffect(()=>{
        const fetch = async()=>{
            const response = await EtudiantTable.get(`/getEtudiant${matricule}`);
            console.log(response);
            setNom(response.data.data[0].nom);
            setPrenom(response.data.data[0].prenom);
            setGroupe(response.data.data[0].groupe);
            setSection(response.data.data[0].code_section);
        }
        fetch();
        
        
    },[])
    const handleSubmit= (e)=>{
        e.preventDefault();
        EtudiantTable.put(`/updateEtudiant${matricule}`,{
            nom,
            prenom,
            groupe,
            code_section:section
        }).then(
        history.push("/Etudiant"));
        
    }
    return(
        <form action="" className="mt-4">
                <h1 className="text-center">Modification {matricule} </h1>
                <input type="text" value={nom} onChange={(e)=>{setNom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le nom"/>
                <input type="text" value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le prenom"/>
                <input type="text" value={groupe} onChange={(e)=>{setGroupe(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le groupe"/>
                <input type="text" value={section} onChange={(e)=>{setSection(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le code de la section"/>
                <button type="submit" className="btn btn-success" onClick={(e)=>{if(window.confirm("Etes vous sure ?"))handleSubmit(e)}}>Valider</button>
        </form>
    );
}

export default ModifierEtudiant;