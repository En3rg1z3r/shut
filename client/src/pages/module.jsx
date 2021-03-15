import ModuleForm from "./components/moduleForm";
import {ModuleContext} from "../context/context" ;
import {useContext, useEffect} from "react";
import ModuleTable from "../apis/etudiantApi";
import {useHistory} from "react-router-dom";

const Module = ()=>{
    let history = useHistory();

    const {modules,setModules, suprimmerModule} = useContext(ModuleContext);

    useEffect(()=>{
        const fetch = async ()=>{
            const response = await ModuleTable.get("/getModules");
            setModules(response.data.data);
        }
        fetch();
    },[]);

    const handleDelete =(code_module)=>{
        ModuleTable.delete(`/deleteModule${code_module}`).then(suprimmerModule(code_module));
    }

    const handleEdit = (code_module)=>{
        history.push(`/modifierModule/${code_module}`);

    }

    return(
        <div>
            <h1 className="text-center">Module</h1>
            <ModuleForm/>
            <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Code de module</th>
                            <th scope="col">Nom de module</th>
                            <th scope="col">Coefficient</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((el)=>{
                            return(
                                <tr key={el.code_module}>

                                    <td>{el.code_module}</td>
                                    <td>{el.nom_module}</td>
                                    <td>{el.coefficient}</td>
                                    <td><button className="btn btn-danger" onClick={()=>{if(window.confirm("Etes vous sure ?"))handleDelete(el.code_module)}}>Supprimer</button></td>
                                    <td><button className="btn btn-dark" onClick={()=>{handleEdit(el.code_module)}}>Modifier</button></td>

                                </tr>
                            );
                        })}
                    </tbody>
            </table>
        </div>
    );
}

export default Module;