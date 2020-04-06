const date =(obj)=>{
    if(obj.length>0){
    obj.map(e=>{
        let day= String(new Date(e.updatedAt).getDate());
        let month= String(new Date(e.updatedAt).getMonth()+1)
        let year= String(new Date(e.updatedAt).getFullYear())
        let hour= String(new Date(e.updatedAt).getHours())
        let minute= String(new Date(e.updatedAt).getMinutes())
        let seconds= String(new Date(e.updatedAt).getSeconds())
        e.updatedAt = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + seconds
    });
    return obj
    }
    else{
        let day= String(new Date(obj.updatedAt).getDate());
        let month= String(new Date(obj.updatedAt).getMonth()+1)
        let year= String(new Date(obj.updatedAt).getFullYear())
        let hour= String(new Date(obj.updatedAt).getHours())
        let minute= String(new Date(obj.updatedAt).getMinutes())
        let seconds= String(new Date(obj.updatedAt).getSeconds())
        obj.updatedAt = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + seconds
        return obj
    }
};

export default date