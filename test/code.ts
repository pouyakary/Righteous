function popStack ( char ) {
    if ( stack.length === 0 ) {
        stack.push( char );
        ends = true;
        return;
    }
    let pairs = { '(': ')', '{': '}', '[': ']' };
    let TOS = stack.pop( );
    if ( TOS === ']' || TOS === '}' || TOS === ')' ) {
        stack.push( TOS );
        stack.push( char );
        ends = true;
    }
}