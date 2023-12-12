module.exports = {
    extend : 'apostrophe-widgets',
    label : 'Video Player',
    addFields : [
        {
            name: 'embed',
            label: 'Choose your Embed',
            type: 'select',
            choices: [
                { label: 'Youtube Embed', value: 'youtube-embed', showFields:['onlineUrl'] },
                { label: 'Vimeo Embed', value: 'vimeo-embed', showFields:['onlineUrl'] },
                { label: 'Custom Video', value: 'no-embed', showFields:['videoUrl' , 'thumbnailOption' , 'caption'] }
            ]
        },
        {
            name: 'thumbnailOption',
            label: 'Choose Your Image Video Poster',
            help : 'URL or Custom Upload. P/s : Preferred URL to avoid resolution issue',
            type: 'select',
            choices: [
                { label: 'URL Image', value: 'thumbnail-url', showFields:['thumbnailVideo'] },
                {
                    label: 'Upload Custom Image',
                    value: 'thumbnail-image',
                    showFields: ['thumbnailCustom']
                }
            ]
        },
        {
            name : 'onlineUrl',
            label : 'Online Video URL',
            type : 'url',
            help : 'For vimeo force fullscreen , add \'?playsinline=0\''
        },
        {
            name: 'thumbnailVideo',
            type: 'url',
            label: 'Thumbnail for video URL',
            required : true
        },
        {
            name: 'thumbnailCustom',
            label: 'Upload your Custom Thumbnail Image',
            type: 'singleton',
            widgetType: 'apostrophe-images',
            required: true,
            options: {
                minSize: [ 100, 100 ],
                limit: [ 1 ]
            }
        },
        {
            name: 'videoUrl',
            label: 'Sources to Video',
            type: 'array',
            titleField: 'Custom Videos',
            schema: [
                {
                    name: 'sourceVideo',
                    type: 'url',
                    label: 'Custom Video URL',
                    required : true
                },
                {
                    name : 'size',
                    label : 'Size of the video',
                    type : 'integer',
                    help : '\'720\' , \'1080\'',
                    required : true
                },
                {
                    name : 'videoType',
                    label : 'Type of video',
                    type : 'string',
                    help: '\'mp4\' , \'ogg\' , \'webm\'',
                    def : 'mp4',
                    required : true
                }
            ]
        },
        {
            name: 'caption',
            label: 'Link to caption',
            type: 'array',
            titleField: 'Captions',
            schema: [
                {
                    name: 'caption',
                    type: 'url',
                    label: 'Link to Caption URL',
                    help: 'vvt format supported. You can check for valid vvt here : https://quuz.org/webvtt/',
                    required : true
                },
                {
                    name : 'captionName',
                    type : 'string',
                    label : 'Caption Label',
                    help : '\'English\' , \'Malay\' , \'Indonesia\'',
                    required: true
                },
                {
                    name : 'lang',
                    type : 'string',
                    label : 'Caption Language',
                    help: '\'en\' , \'my\' , \'fr\''
                },
                {
                    name : 'defaultCaption',
                    type : 'boolean',
                    label : 'Default caption ?',
                    help : 'Only one Default caption needed. The rest can be choose using widget player'
                }
            ]
        }
    ],
    construct : function(self,options){
        self.pushAsset('script' , 'plyr.min' , {when : 'always'})
        self.pushAsset('script' , 'videoWidget' , {when : 'always'})
        self.pushAsset('script', 'plyr.polyfilled.min', {
            when: 'always'
        })
        self.pushAsset('stylesheet' , 'plyr' , {when : 'always'})
        self.pushAsset('stylesheet' , 'custom' , {when : 'always'})
    }
}