module.exports = function(self, options){
    self.setSubmitSchema = function () {
        self.submitSchema = self.apos.schemas.subset(self.schema,
            ['productId', 'date', 'readerName', 'reviews','ratings']
        )
    };
}