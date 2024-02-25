module.exports = function(self,options){
    self.allQuoteRequestSchema = function () {
        self.quoteRequestSchema = self.apos.schemas.subset(self.schema,
            ['personName', 
            'email',
            'telephone',
            'numberOfRooms',
            'numberOfExtWalls',
            'message','image1','image2','image3','image4','image5','image6','image7','image8','image9','image10',
            'date'
            ]
        )
    }
}