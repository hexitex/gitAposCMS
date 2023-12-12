///**** Please note, the challange stated that any server technology I am used to/already have setup can be used. 
///**** For simplicity I am running this code on my own server as ApotropheCMS(Express based) requires some setup.
/// * You can however copy and paste the function with the keys into a seperate file and run as console.log(combinations('123456'))   

module.exports = {
    extend: 'apostrophe-module',
    name: 'phoneSim',
    label: 'Phone Sim Number Combinations',

    construct: function (self, options) {
        // only needed during dev - setup cors for node access with react in dev
        // 1. The constructor sets up the express app and sets up the cors middleware.
        // 2. The app.use method is a middleware that allows us to add middleware to the app.
        // 3. The middleware is a function that takes three arguments: req, res, and next.
        self.apos.app.use('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        // 1. The app.post method is used to create a new route. The route is set to the /v1/public/challenge endpoint.
        // 2. The async function is used to handle the request.
        const host="http://"
        self.apos.app.post('/v1/public/challenge', async function (req, res, next) {

            const numbers = req.body.numbers;

            if (numbers.length) {
                try {
                    const output = combinations(numbers);
                    res.send(JSON.stringify(output));
                } catch (err) {
                    console.log(err);
                    res.send({ "error": err });
                }
            }
        });

        const keys = { '0': ' ', '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };

        function combinations(numbers) {
            console.log(numbers)
            // timer operation 
            const starttime = Date.now()
            // max memory that this can consume at once, DFS can pop memory very quickly if unleashed without control
            const maxSize = 1048576 / 4; //1048576 bytes=1Mb  /4 250kb

            // return obj shape
            let returnObj = {
                results: [],
                message: '',
                numberOfChunks: 1,
                initialSizeOfChunks: 0,
                combinations: 0,
                totalSpaceRequirements: 0,
                timeInMS: 0,
                chunkLengths: [],
                error: false,
                maxMemoryAllowed: `${formatSizeUnits(maxSize)}`
            }
            //remove anything that is not in the keys

            numbers = numbers.replace(/[^02-9]/g, '');

            //nothing to do!
            if (numbers == null || numbers === '') {
                return {
                    message: 'No valid data provided, only integer numbers are valid (except 1)',
                    results: [],
                    error: true
                };
            }

            // if we are going to allocate 250mb or more in heap mem we could fail fast or setup multiple returns for smaller chunks to be assembled by client
            const size = computeSpace(numbers);
            returnObj.message = `The number of combinations are ${Number(size.combinations).toLocaleString()}, this will require at least ${formatSizeUnits(size.space)} of additional memory if done at once! `
            returnObj.totalSpaceRequirements = size.space;
            returnObj.combinations = size.combinations;

            let result = [];

            // are we too big?
            if (size.space >= maxSize) {
                // we need to chunk this 
                // find the largest chunk size based on maxSize defined as bytes
                // halve until we fit
                let chunk = [];
                let devision = 2;
                returnObj.message += ' Chunking results for you to combine as this would exceed max size!';
                chunk[0] = numbers.slice(0, Math.ceil(numbers.length / devision))
                //include * devision so that the whole result size is taken into account
                while (computeSpace(chunk[0]).space * devision >= maxSize) {
                    devision++;
                    // we only need to check first chunk for total devisions
                    chunk[0] = numbers.slice(0, Math.ceil(numbers.length / devision))
                }
                // set our information on return obj
                returnObj.initialSizeOfChunks = chunk[0].length;
                returnObj.numberOfChunks = devision;

                // we are chunking to devisions
                let chunkArray = chunkArrayInGroups(numbers, chunk[0].length)

                for (let i = 0; i < chunkArray.length; i++) {
                    // console.log('chunk ' + i + ' ' + chunkArray[i]);
                    result = [];
                    depthFirstSearch(chunkArray[i], 0, '', result);
                    returnObj.results.push(result);
                    returnObj.chunkLengths.push(result.length);
                }
            } else {

                let result = [];
                returnObj.sizeOfChunk = numbers.length;
                //start the recursion at zero with the number string
                depthFirstSearch(numbers, 0, '', result);
                returnObj.results.push(result);
                returnObj.chunkLengths.push(result.length);

            }
            returnObj.timeInMS = Date.now() - starttime;
            return returnObj;
        }
        /*
        * 
        * This is the esense of the challenge, everything else is belt and brances to stop things going bang.
        * Recursion/time isn't a problem as things pop off the stack based on the number of numbers - space is the issue 
        * A list of 14 numbers will wipeout your heap memory in less than 30 secs.
        * my old workhorse does 64million (2GB) combinations in 24sec - ask for more and memory is bye bye!
        * Servering anything but smaller combinations would be impracticle - best to return a generator:)
        *
        */
        // 1. It first checks if the index is equal to the length of the input array. If so, it adds the currentChars to the result array and returns.
        // 2. It then iterates over the keys map using the incremented index of the input array.
        // 3. For each key, it creates a new char set by adding the newly found char from the keys map to the current char set.
        // 4. It then calls itself incrementing the index, adding the newly found char from the keys map to the current char set.
        // 5. It then returns.
        function depthFirstSearch(numbers, index, currentChars, result) {

            if (index === numbers.length) {
                result.push(currentChars);
                return;
            }

            //iterate over the keys map using incremented index of the input: numbers
            for (let newChars of keys[numbers[index]]) {
                //call yourself incrementing the index, adding the newly found char from the keys map to the current char set
                depthFirstSearch(numbers, index + 1, currentChars + newChars, result);
            }
        }

        //1. Create a new array.
        // 2. Loop through the original array.
        // 3. Take the element at the current index and push it to the new array.
        // 4. Increment the index by the chunk size.
        // 5. Repeat steps 2-4 until the original array is empty.
        // 6. Return the new array.
        function chunkArrayInGroups(arr, size) {
            // chunkArrayInGroups: function (arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }
        // fail fast if combinations will break heap memory

        // 1. We first find the length of the longest key in the dictionary.
        // 2. Then we multiply that length by the number of keys in the dictionary.
        // 3. Then we multiply that by the number of numbers in the array.
        // 4. Then we multiply that by 2, for bytes of each char
        // 5. Then we multiply that by the number of numbers in the array, because we're going to be repeating the process for each number.
        function computeSpace(numbers) {
            let space = keys[numbers[0]].length;
            for (let i = 1; i < numbers.length; i++) {
                let len = keys[numbers[i]].length
                space = len * space;
            }
            let combinations = space;
            space = (space * 2) * numbers.length
            return { space: space, combinations: combinations };
        }
  
        function formatSizeUnits(bytes) {
            if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toLocaleString() + " GB"; }
            else if (bytes >= 1048576) { bytes = (bytes / 1048576).toLocaleString() + " MB"; }
            else if (bytes >= 1024) { bytes = (bytes / 1024).toLocaleString() + " KB"; }
            else if (bytes > 1) { bytes = bytes.toLocaleString() + " bytes"; }
            else if (bytes === 1) { bytes = bytes + " byte"; }
            else { bytes = "0 bytes"; }
            return bytes;
        }

    }
}
