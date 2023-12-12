module.exports = function(self,options){
    self.allMemberSchema = function () {
        self.memberSchema = self.apos.schemas.subset(self.schema,
            ['first', 'last','emailAddress','mobile','address1','address2','town','county','country', 'postcode','pass','photo']
        )
    }
}