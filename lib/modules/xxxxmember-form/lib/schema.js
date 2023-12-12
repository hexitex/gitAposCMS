module.exports = function(self,options){
    self.allMemeberSchema = function () {
        self.allMemeberSchema = self.apos.schemas.subset(self.schema,
            ['first', 'last','address1','address2','address3','address4','country','postcode', 'emailAddress', 'pass', 'mobile','joinedDate']
        )
    }
}