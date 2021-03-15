import EtudiantForm from './components/etudiantForm'
import {EtudiantContext,EtudiantContextProvider} from '../context/context';
import {useEffect, useContext} from 'react';
import EtudiantTable from '../apis/etudiantApi';
import {useHistory} from 'react-router-dom';
const Etudiant = (props)=>{

    const {etudiants, setEtudiants, suprimmerEtudiant} = useContext(EtudiantContext);
    let history = useHistory();
    useEffect(()=>{
        try {
              async function fetch(){
                const response = await EtudiantTable.get("/getEtudiants");
                console.log(response);
                setEtudiants(response.data.data);
            } 
            fetch();
        } catch (e) {
            console.error(e);
        }

    },[])
    
    const handleDelete = (matricule)=>{
        EtudiantTable.delete(`/deleteEtudiant${matricule}`).then(suprimmerEtudiant(matricule));
               
    } 
    
    const handleEdit = (matricule)=>{
        history.push(`/modifierEtudiant/${matricule}`);
    }
    return(
        <>  <h1 className="text-center">Etudiants</h1>
            <EtudiantForm/>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Matricule</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Goupe</th>
                            <th scope="col">Section</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {etudiants.map((el)=>{
                        return(
                            <tr key={el.matricule}>
                        <th scope="row">{el.matricule}</th>
                        <td>{el.nom}</td>
                        <td>{el.prenom}</td>
                        <td>{el.groupe}</td>
                        <td>{el.code_section}</td>
                        <td><button onClick={()=>{if(window.confirm("Etes vous sure ?"))handleDelete(el.matricule)}} className="btn btn-danger">Supprimer</button></td>
                        <td><button onClick={()=>{handleEdit(el.matricule)}} className="btn btn-dark">Modifier</button></td>

                    </tr>
                        );
                    })}
                    
                   
                </tbody>
            </table>
        </>
    );
}

export default Etudiant;