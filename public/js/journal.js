function GUID ()
{
    var S4 = function ()
    {
        return Math.floor(
                          Math.random() * 0x10000 /* 65536 */
                          ).toString(16);
    };
    
    return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
            );
}

function Entry( id, title, tags, body, created ) {
    var self = this;
    
    self.id = ko.observable(id);
    self.title = ko.observable(title);
    self.tags = ko.observable(tags);
    self.body = ko.observable(body);
    self.created = ko.observable(created);
}

function Tag( label ) {
    var self = this;
    self.label = label;
    self.list = [];

}

function JournalViewModel() {
    var self = this;
    
    self.entryList = ko.observableArray([]);
    self.entrys = {};

    self.tagList = ko.observableArray([]);
    self.tags = {};
    
    self.addEntry = function( id, title, tags, body, created ) {
        e = new Entry( id, title, tags, body, created );
        self.entryList.unshift( e )
        self.entrys[id] = e;

        current_tags = tags.split( "," );
        for( var i in current_tags ) {
            current_tag = current_tags[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var tag = self.tags[current_tag];
            if ( tag == undefined ) {
                tag = new Tag( current_tag );
                self.tagList.push( tag );
                self.tags[current_tag] = tag;
            }

            tag.list.push( e );
        }

        return e;
    }

    self.idExists = function( id ) {
        for( var i in self.entryList ) {
            if ( self.entryList[i].id == id ) {
                return true;
            }
        }
        return false;
    }
    self.getNewId = function() {
        loop = true;
        id = null;
        while( loop ) {
            id = GUID();
            loop = self.idExists( id );
        }
        
        return id;
    }
}

function processEntrys( data ) {
    for( var i in data ) {
        r = data[i];
        vm.addEntry( r.id, r.title, r.tags, r.body, r.created );
    }
}

function processData() {
    processEntrys( mfsResponseList[0] );
}

function finishDataPrep() {
    processData();
}

function startDataPrep(user) {
    mfsInit();
    mfsFileList.push( "/entry/" + user );
    mfsGo( finishDataPrep );
}

var vm = new JournalViewModel();
startDataPrep( 'PDGY' );
