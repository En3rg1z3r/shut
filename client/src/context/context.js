import {createContext, useState} from 'react';
export const EtudiantContext = createContext();

export const EtudiantContextProvider = props => {
    
    const [etudiants, setEtudiants] = useState([]);
    const ajouterEtudiant= (etudiant)=>{
        setEtudiants([...etudiants, etudiant]);
    }
    
    const suprimmerEtudiant = (matricule)=>{
        setEtudiants(etudiants.filter(el=>
            el.matricule !== matricule
        ));
    }

    return(
        <EtudiantContext.Provider value={{etudiants, setEtudiants, ajouterEtudiant, suprimmerEtudiant}}>
            {props.children}
        </EtudiantContext.Provider>
    );
}

export const ModuleContext = createContext();

export const ModuleContextProvider = props=>{

    const [modules, setModules]= useState([]);

    const ajouterModule=(module)=>{
        setModules([...modules, module]);
    }
    const suprimmerModule= (code)=>{
        setModules(modules.filter(el=>el.code_module!==code));
    }

    return(
        <ModuleContext.Provider value={{modules, setModules, ajouterModule, suprimmerModule}}>
            {props.children}
        </ModuleContext.Provider>
    );
}