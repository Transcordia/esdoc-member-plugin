class Plugin {
  constructor() {
  }

  /**
   * We will iterate over the resulting data structure looking for doc records of type get/set and create a new type
   * that combines these values into a single property. The unique value of a property is contained in `doc.longname`.
   *
   * @param ev
   */
  onHandleDocs( ev ) {
    const docs = ev.data.docs

    // Filter out the getters and setters
    const getters = docs.filter( _getters )
    const setters = docs.filter( _setters )

    // merge getters and setters based on longname property
    // eg. { <longname>: { get: <getter doc record>, set: <setter doc record> } , <longname>: {...} }
    const getset = getters.concat( setters ).reduce( collect, {} )

    // Object.values not present in Node < 7.0 :(
    const values = Object.keys( getset ).map( key => getset[ key ] )

    // Reduce the values into a single entry and delete the other if necessary
    // eg. { deleted: [ 3, 7, 11 ], updated: { <__docId__>: <new doc>, <__docId__>: <new doc>, ... } }
    const combined = values.reduce( combine, { deleted : [], updated : [] } )

    // Apply the deleted and updated values against the docs, and update ev.data.docs
    ev.data.docs = docs
        .filter( doc => !combined.deleted.includes( doc.__docId__ ) )
        .map( doc => combined[ doc.__docId__ ] || doc )
  }
}

// value is an object with either a get property (containing a doc), a set property (containing a doc) or both.
const combine = ( a, value ) => {
  const kind = 'member'

  if ( value.get && value.set ) {
    value.get.kind = kind
    value.get.modality = 'both'
    value.get.description += '\n\n' + value.set.description
    a.updated.push( value.get )
    a.deleted.push( value.set.__docId__ )
  }

  else if ( value.get ) {
    value.get.kind = kind
    value.get.modality = 'readonly'
    a.updated.push( value.get )
  }

  else if ( value.set ) {
    value.set.kind = kind
    value.set.modality = 'writeonly'
    a.updated.push( value.set )
  }

  return a
}

const _getters = doc => doc.kind === 'get'

const _setters = doc => doc.kind === 'set'

const collect = ( accum, doc ) => {
  accum[ doc.longname ] = Object.assign( accum[ doc.longname ] || {}, { [doc.kind] : doc } )
  return accum
}

module.exports = new Plugin();
