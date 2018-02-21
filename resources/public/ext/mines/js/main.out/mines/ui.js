// Compiled by ClojureScript 1.9.946 {:static-fns true, :optimize-constants true}
goog.provide('mines.ui');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('mines.state');
/**
 * href helper
 */
mines.ui.http_link = (function mines$ui$http_link(var_args){
var G__14929 = arguments.length;
switch (G__14929) {
case 1:
return mines.ui.http_link.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return mines.ui.http_link.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

mines.ui.http_link.cljs$core$IFn$_invoke$arity$1 = (function (href){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,href], null),href], null);
});

mines.ui.http_link.cljs$core$IFn$_invoke$arity$2 = (function (href,text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,href], null),text], null);
});

mines.ui.http_link.cljs$lang$maxFixedArity = 2;

/**
 * Button utility, optionally accepts right-click action
 */
mines.ui.button = (function mines$ui$button(var_args){
var G__14932 = arguments.length;
switch (G__14932) {
case 3:
return mines.ui.button.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return mines.ui.button.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

mines.ui.button.cljs$core$IFn$_invoke$arity$3 = (function (title,class$,action){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,title,cljs.core.cst$kw$on_DASH_click,action,cljs.core.cst$kw$class,class$], null)], null);
});

mines.ui.button.cljs$core$IFn$_invoke$arity$4 = (function (title,class$,action,right_action){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,title,cljs.core.cst$kw$on_DASH_click,action,cljs.core.cst$kw$onContextMenu,right_action,cljs.core.cst$kw$class,class$], null)], null);
});

mines.ui.button.cljs$lang$maxFixedArity = 4;

/**
 * Debug console
 */
mines.ui.debug = (function mines$ui$debug(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"debug"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.button,"Reveal All","user",(function (){
var seq__14934 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),(81)));
var chunk__14935 = null;
var count__14936 = (0);
var i__14937 = (0);
while(true){
if((i__14937 < count__14936)){
var idx = chunk__14935.cljs$core$IIndexed$_nth$arity$2(null,i__14937);
mines.state.reveal_BANG_(idx);

var G__14938 = seq__14934;
var G__14939 = chunk__14935;
var G__14940 = count__14936;
var G__14941 = (i__14937 + (1));
seq__14934 = G__14938;
chunk__14935 = G__14939;
count__14936 = G__14940;
i__14937 = G__14941;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq(seq__14934);
if(temp__5457__auto__){
var seq__14934__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14934__$1)){
var c__9602__auto__ = cljs.core.chunk_first(seq__14934__$1);
var G__14942 = cljs.core.chunk_rest(seq__14934__$1);
var G__14943 = c__9602__auto__;
var G__14944 = cljs.core.count(c__9602__auto__);
var G__14945 = (0);
seq__14934 = G__14942;
chunk__14935 = G__14943;
count__14936 = G__14944;
i__14937 = G__14945;
continue;
} else {
var idx = cljs.core.first(seq__14934__$1);
mines.state.reveal_BANG_(idx);

var G__14946 = cljs.core.next(seq__14934__$1);
var G__14947 = null;
var G__14948 = (0);
var G__14949 = (0);
seq__14934 = G__14946;
chunk__14935 = G__14947;
count__14936 = G__14948;
i__14937 = G__14949;
continue;
}
} else {
return null;
}
}
break;
}
})], null)], null);
});
/**
 * Score component
 */
mines.ui.score = (function mines$ui$score(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$score,["Score: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mines.state.app_state),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$score], null)))].join('')], null);
});
/**
 * Cell component
 */
mines.ui.cell = (function mines$ui$cell(c){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(c),"hidden")){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.button," ","cell",(function (){
return mines.state.reveal_BANG_(cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(c));
}),(function (){
return mines.state.toggle_flag_BANG_(cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(c));
})], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(c),"flagged")){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.button,"\u2691","cell",(function (){
return cljs.core.List.EMPTY;
}),(function (){
return mines.state.toggle_flag_BANG_(cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(c));
})], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(c),"revealed")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$cell,(function (){var v = cljs.core.cst$kw$val.cljs$core$IFn$_invoke$arity$1(c);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,(10))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$mine,"*"], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,["_",cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)].join('')], null);
}
})()], null);
} else {
return null;
}
}
}
});
/**
 * Player console
 */
mines.ui.player = (function mines$ui$player(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.score], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.button,"New Game!","user",(function (){
mines.state.new_game_BANG_((9),(10));

return mines.state.reset_score_BANG_();
})], null)], null);
});
/**
 * The minefield
 */
mines.ui.grid = (function mines$ui$grid(grid){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,(function (){var iter__9553__auto__ = (function mines$ui$grid_$_iter__14950(s__14951){
return (new cljs.core.LazySeq(null,(function (){
var s__14951__$1 = s__14951;
while(true){
var temp__5457__auto__ = cljs.core.seq(s__14951__$1);
if(temp__5457__auto__){
var s__14951__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14951__$2)){
var c__9551__auto__ = cljs.core.chunk_first(s__14951__$2);
var size__9552__auto__ = cljs.core.count(c__9551__auto__);
var b__14953 = cljs.core.chunk_buffer(size__9552__auto__);
if((function (){var i__14952 = (0);
while(true){
if((i__14952 < size__9552__auto__)){
var c = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__9551__auto__,i__14952);
cljs.core.chunk_append(b__14953,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.cell,c], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(c)], null)));

var G__14954 = (i__14952 + (1));
i__14952 = G__14954;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14953),mines$ui$grid_$_iter__14950(cljs.core.chunk_rest(s__14951__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14953),null);
}
} else {
var c = cljs.core.first(s__14951__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.cell,c], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(c)], null)),mines$ui$grid_$_iter__14950(cljs.core.rest(s__14951__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__9553__auto__(grid);
})()], null);
});
/**
 * Game ui
 */
mines.ui.ui = (function mines$ui$ui(){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h1,"MINES!"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$grid,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.grid,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mines.state.app_state),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid], null))], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.player], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.debug], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [mines.ui.http_link,"https://github.com/deciduously/mines","github"], null)], null);
});
