import axios from 'axios';

export const server="http://frontendshowcase.azurewebsites.net:80";
    
export function getAll(resourceType) {
        return axios.get(server+"/api/"+resourceType)
    }

export function getOne(resourceType, id) {
        return axios.get(server+"/api/"+resourceType+"/"+id)
    }

export function Create(resourceType, value) {
        axios.post(server+"/api/"+resourceType, value)
        .then(function(response){
            console.log("POST Response: ". response);
        }
        )
    }

export function Update(resourceType, value) {
        axios.put(server+"/api/"+resourceType, value)
        .then(function(response) {
            console.log("Update Response: ", response);
        })
    }

export function Delete(resourceType, id) {
        axios.delete(server+"/api/"+resourceType+"/"+id)
        .then(function(response){
            console.log("Delete Response: ", response);
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
        })
    }