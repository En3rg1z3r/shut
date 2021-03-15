
import {useEffect, useState} from 'react';
import ModuleTable from '../../apis/etudiantApi';
import {useParams, useHistory} from 'react-router-dom';
const ModifierModule = ()=>{
    let history = useHistory();

    const {codemodule} = useParams();
    const [nom, setNom] = useState("");
    const [coeff, setCoeff] = useState("");

    useEffect(()=>{
        const fetch = async ()=>{
            const response = await ModuleTable.get(`/getModule${codemodule}`);
            console.log(response);
            setNom(response.data.data[0].nom_module);
            setCoeff(response.data.data[0].coefficient);
        };
        fetch();
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        ModuleTable.put(`/updateModule${codemodule}`);
        history.push("/Module");
    }

    return(
        <div className="mt-4">
            <h1 className="text-center">Modifier le module {codemodule}</h1>
            <input type="text" value={nom} onChange={(e)=>{setNom(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le nom du module"/>
            <input type="text" value={coeff} onChange={(e)=>{setCoeff(e.target.value)}} className="form-control mb-1" placeholder="Saisissez le coefficient"/>
            <button className="btn btn-success" onClick={(e)=>{if(window.confirm("Etes vous sure ?"))(handleSubmit(e))}} >Valider</button>
        </div>
    );
}

export default ModifierModule;