class APIFeatures
{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }

    search()
    {
       let keyword= this.queryStr.keyword?
       {
        name:
        {
            $regex:this.queryStr.keyword,
            $options:'i'//case insensitive
        }
       }:
       {};
       this.query.find({...keyword})
       return this;
    }


    filterbyCategory()
    {
        let querystr2={...this.queryStr};
        const removeFields=['keyword','limit','page'];
       

        removeFields.forEach(field=>delete querystr2[field]);
        console.log(querystr2);
        this.query.find(querystr2);
        return this;
    }

    paginationFeature(resultPerPage)
    {
        const curr_page=Number(this.queryStr.page) || 1;
        let skip=resultPerPage*curr_page-1;
       
        this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports=APIFeatures;