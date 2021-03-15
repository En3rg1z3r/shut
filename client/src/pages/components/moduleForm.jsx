import {useState, useContext} from 'react';
import ModuleTable from '../../apis/etudiantApi';
import {ModuleContext} from '../../context/context';

const ModuleForm = ()=>{
    const {ajouterModule} = useContext(ModuleContext);
    const [code, setCode] = useState("");
    const [nom, setNom] = useState("");
    const [coeff, setCoeff] = useState("");
    
    const handleSubmit = ()=>{
        ModuleTable.post("/createModule",{
            code_module : code,
            nom_module : nom, 
            coefficient: coeff
        }).then(
            ajouterModule({
                code_module : code,
                nom_module : nom, 
                coefficient: coeff
            })
        );
    }

    return(
        <div className="mt-4 mb-4">
            <h1>Remplissez les champs pour ajouter un module</h1>
            <input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le code du module"/>
            <input type="text" value={nom} onChange={(e)=>{setNom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le nom du module"/>
            <input type="text" value={coeff} onChange={(e)=>{setCoeff(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le coefficient"/>
            <button className="btn btn-success" onClick={()=>{if(window.confirm("Etes vous sure ?"))handleSubmit()}}>Ajouter</button>
        </div>
    );
}

export default ModuleForm;