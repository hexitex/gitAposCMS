module.exports = function(self,options){
    self.allTempSchema = function () {
        self.tempSchema = self.apos.schemas.subset(self.schema,
            ['nsection']
        )
    };
}