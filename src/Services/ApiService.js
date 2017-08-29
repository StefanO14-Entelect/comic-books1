import axios from 'axios';

export const server="http://frontendshowcase.azurewebsites.net:80";

export class ApiService {
    
    export getAll(resourceType) {
        axios.get(server+"/api/"+resourceType)
        .then(function(response){
            const resourses = response.data;
            return resources;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
            return null;
        })
    }

    export getOne(resourceType, id) {
        axios.get(server+"/api/Suppliers/"+id)
        .then(function(response) {
            var resource = response.data;
            return resource;
        }.bind(this))
        .catch(function(error) {
            console.log("Error: ", error);
            return null;
        })
    }

    export Create(resourceType, value) {
        axios.post(server+"/api/"+resourceType, value)
        .then(function(response){
            console.log("POST Response: ". response);
        }
        )
    }

    export Update(resourceType, value) {
        axios.put(server+"/api/"+resourceType, value)
        .then(function(response) {
            console.log("Update Response: ", response);
        })
    }

    export Delete(resourceType, id) {
        axios.delete(server+"/api/"+resourceType+"/"+id)
        .then(function(response){
            console.log("Delete Response: ", response);
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
        })
    }
}