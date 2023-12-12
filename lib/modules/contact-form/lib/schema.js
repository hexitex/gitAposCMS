module.exports = function(self,options){
    self.allContactSchema = function () {
        self.contactSchema = self.apos.schemas.subset(self.schema,
            ['personName', 'email', 'message', 'date']
        )
    }
}