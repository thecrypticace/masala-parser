/**
 * Created by Simon on 14/12/2016.
 */

import Parser from '../../lib/standard/text-parser';

let value = undefined;
let accepted = undefined;
let parser = null


function testLine(line){
    let parsing = parser.parse(line);
    value = parsing.value;
    accepted = parsing.isAccepted();
    console.info('parsing', parsing, '\n');
}

export default {
    setUp: function (done) {

        parser = Parser;
        done();
    },


    'test empty text': function (test) {
        test.expect(2);

        testLine('\n');
        test.ok(!accepted, 'empty line are to be rejected');

        testLine('   \n');
        test.ok(!accepted, 'blank line are to be rejected');

        test.done();
    },


    'test simple text': function (test) {
        test.expect(2);

        testLine('text\n');
        test.deepEqual({paragraph:[{text:'text'} ]}, value );

        testLine('  text \n');
        test.deepEqual({paragraph:[{text:'text '} ]}, value );

        test.done();
    },

    'test italic': function (test) {
        test.expect(1);

        testLine('*text*\n');
        test.deepEqual({paragraph:[{italic:'text'}]}, value );

        test.done();
    },

    'test bold': function (test) {
        test.expect(1);

        testLine('**text**\n');
        test.deepEqual({paragraph:[{bold:'text'} ]}, value );

        test.done();
    },


    'test combined format': function (test) {
        test.expect(1);

        testLine('  *italic* text **then bold** \n');
        let expected={paragraph:[{italic:'italic'},{text:' text '}
            ,{bold:'then bold'}, {text:' '} ]}
        test.deepEqual(expected, value );

        test.done();
    },

    

}