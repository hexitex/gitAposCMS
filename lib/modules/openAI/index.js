//const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
//const Promise = require('bluebird');
const got = require('got');
module.exports = {
    extend: 'apostrophe-module',
    name: 'openAI',
    label: 'AI Auto Generate',

    beforeConstruct: function (self, options) {
        // Insert code here
    },

    construct: function (self, options) {
        if (!process.env.OPENAI_SECRET) {
            console.error('WARNING: missing secret for openAI plugin');
        }
        self.apos.app.all('*', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
          });
        self.apos.app.post('/openai/lookup', async function (req, res, next) {
            // try {
            // const info = {
            //   method: 'paypal',
            //   extras: `Paypal payerId: ${req.body.engine}, orderId: ${req.body.orderID}`
            // };
            //console.log("we are in here! ")
            const engine = req.body.engine;
            let prompt = "";
            const what = req.body.what;
            const rtemp=req.body.temp;
            let tokens = 80;
            let ptemp=0;
            let temp=0;
            let topp=1.0;
            let frePen=0.0;
            let presencePen=0.0;
            let stopt='"""';
            let newPrompt= req.body.prompt;
            
            if (what === "Description") {
                prompt = 'What is a human\n'
                +'Humans (Homo sapiens) are the most abundant and widespread species of primate, characterized by bipedalism and large, complex brains. This has enabled the development of advanced tools, culture, and language. Humans are highly social and tend to live in complex social structures composed of many cooperating and competing groups, from families and kinship networks to political states. Social interactions between humans have established a wide variety of values, social norms, and rituals, which bolster human society.\n'
                +'Who was president of the United States in 1955\n'
                +'Dwight D. Eisenhower was president of the United States in 1955. Eisenhower, born David Dwight Eisenhower, was raised in Abilene, Kansas, in a large family of mostly Pennsylvania Dutch ancestry. His family had a strong religious background. His mother became a Jehovah\'s Witness. Eisenhower, however, did not belong to any organized church until 1952. He graduated from West Point in 1915 and later married Mamie Doud, with whom he had two sons. During World War I, he was denied a request to serve in Europe and instead commanded a unit that trained tank crews. \n'
                +'What is the square root of banana\nUnknown\n'
                +'How does a telescope work\n'
                +'Telescopes use lenses or mirrors to focus light and make objects appear closer. The earliest existing record of a telescope was a 1608 patent submitted to the government in the Netherlands by Middelburg spectacle maker Hans Lippershey for a refracting telescope.[4] The actual inventor is unknown but word of it spread through Europe. Galileo heard about it and, in 1609, built his own version, and made his telescopic observations of celestial objects.\n'
                +'Where were the 1992 Olympics held\nThe 1992 Olympics were held in Barcelona, Spain.\nHow many squigs are in a bonk\nUnknown\n' + newPrompt + "\n"
                tokens = 180;
                ptemp=0.5;
                temp==='Preset' ? temp=ptemp : temp=rtemp;
                topp=1.0;
                frePen=0.5;
                presencePen=0.0;
                stopt='\n';
            }
            if (what === "Gramma Correction") {
                prompt = "Original:" + newPrompt + "\nStandard British English:\n"
                tokens = 100;
                ptemp=0.0;
                temp==='Preset' ? temp=ptemp : temp=rtemp;
                topp=1.0;
                frePen=0.0;
                presencePen=0.0;
                stopt='\n';
            }
            if (what === "Summary") {
                prompt = 'Radio telescopes contains a single receiver and records a single time-varying signal characteristic of the observed region; this signal may be sampled at various frequencies. In some newer radio telescope designs, a single dish contains an array of several receivers; this is known as a focal-plane array.\n'
                +'Radio telescopes work differently to opticle telescopes, a radio telescope looks at a single point in the sky and measures radio waves, opticle telescopes use visible light\n'
                +'Telephones are communications devices that permit two or more users to conduct a conversation when they are too far apart to be heard directly. A telephone converts sound, typically and most efficiently the human voice, into electronic signals that are transmitted via cables and other communication channels to another telephone which reproduces the sound to the receiving user.\n'
                +'Telephones allow communication, like speaking with each other over distance.Telephones can be wired or wireless\n' + newPrompt + '\n'
                tokens = 60;
                ptemp=0.0;
                temp==='Preset' ? temp=ptemp : temp=rtemp;
                topp=1.0;
                frePen=0.0;
                presencePen=0.0;
                stopt='\n';
            }
            // if (what === "Advert") {
            //     prompt = 'There are many different types of makeup. The most common types of makeup are foundation, powder, and eye shadow. Foundation is used to cover blemishes and imperfections on the skin. Powder is used to set foundation and make it last longer. Eye shadow is used to create a variety of looks for the eyes.\nMakeup, look great everyday!\nhe law in the United Kingdom is a complex system of rules and regulations that govern the behaviour of its citizens. The law is enforced by the police, who have the power to arrest people for breaking the law. The police are also responsible for investigating crimes and prosecuting offenders.\nFollow the law - its just right!\n' + prompt + '\n'
            //     tokens = 60;
            //     temp=0.7;
            //     topp=0.7;
            //     frePen=0.0;
            //     presencePen=0.0;
            //     stopt='\n';
            // }
            if (what === "Advert") {
                    prompt = 'Product:Bikes\nDescription: Low prices and huge selection. Free and fast delivery. Order online today!\n'+
                    'Product:Bikes\nDescription: Stylish bikes. Make your experience memorable. Reserve online in minutes!\n'+                    
                    'Product:Bikes Locally\nDescription: Our friendly staff will help you find the perfect bike. Visit our store today!\n'+
                    'Product:Bitcoin\nDescription: Exchange and buy Bitcoin and other crypto now!\n'+
                    'Product:Hair dryer\nDescription: Our dryers blow like nothing else! Get yours now!\n'+
                    'Product:Application Software\nDescription: Our market leading apps will change the way you think about software!\n'+
                    '\nProduct:'+newPrompt+'\nDescription:'
                  
                    tokens = 60;
                    ptemp=0.27;
                    temp==='Preset' ? temp=ptemp : temp=rtemp;
                    topp=0.7;
                    frePen=0.0;
                    presencePen=0.0;
                    stopt='\n';
                }
            if (what === "Headline") {
                prompt = "I went to the shops and bought some bread, it wasn't that interesting\n"+
                "Person buys bread shocker!\n"
                +"It was very warm today in the house, I needed to use a fan\n"
                +"House overheats, fans brought in!\n"
                +"The three major US indices went into retreat last week as concerns about the Omicron variant of coronavirus sapped investor confidence. Markets were down over the week despite a rally on Thursday on the back of monetary policy announcements from the Federal Reserve on Wednesday.\n"
                +"US markets retreat, Omicron looms\n" 
                +"To create sustainable competitive advantage in this challenging environment, financial services companies must leverage technology to create more responsive and agile systems. From risk management to trading algorithms and customer service, the right data platform enables innovation and speed.\n"
                +"We are Faster, smarter, and more efficient"
                + newPrompt + "\n"
                tokens = 15;
                ptemp=0.0;
                temp==='Preset' ? temp=ptemp : temp=rtemp;
                topp=1.0;
                frePen=0.0;
                presencePen=0.0;
                stopt='\n';
            }
            if (what === "Outline") {
                prompt = "Create an numbered outline for an essay about "+ newPrompt + ":\n";
               
                tokens = 180;
                ptemp=0.8;
                temp==='Preset' ? temp=ptemp : temp=rtemp;
                topp=1.0;
                frePen=0.0;
                presencePen=0.0;
              //  stopt='\n';
            }
       
            (async () => {
                console.log(prompt)
                const url = 'https://api.openai.com/v1/engines/' + engine + '/completions';
                const params = {
                    "prompt": prompt,
                    "max_tokens": tokens,
                    "temperature": parseFloat(temp),
                    "top_p": topp,
                    "frequency_penalty": frePen,
                    "presence_penalty":presencePen,
                    "stop": stopt,
                };
                const headers = {
                    'Authorization': `Bearer ${process.env.OPENAI_SECRET}`,
                };

                try {
                    console.log(params)
                    const response = await got.post(url, { json: params, headers: headers }).json();
                    output = response.choices[0].text;
                    console.log(output);
                    res.send({"content":output});
                } catch (err) {
                    console.log(err);
                    res.send({"error":err});
                }
            })();



         
        })
    }
}
