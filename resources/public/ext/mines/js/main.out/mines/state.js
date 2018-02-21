// Compiled by ClojureScript 1.9.946 {:static-fns true, :optimize-constants true}
goog.provide('mines.state');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
if(typeof mines.state.app_state !== 'undefined'){
} else {
mines.state.app_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$score,(0),cljs.core.cst$kw$grid,cljs.core.PersistentVector.EMPTY], null));
}
/**
 * access util for 'thing' in app-state ratom
 */
mines.state.update_state_BANG_ = (function mines$state$update_state_BANG_(var_args){
var args__9957__auto__ = [];
var len__9950__auto___14911 = arguments.length;
var i__9951__auto___14912 = (0);
while(true){
if((i__9951__auto___14912 < len__9950__auto___14911)){
args__9957__auto__.push((arguments[i__9951__auto___14912]));

var G__14913 = (i__9951__auto___14912 + (1));
i__9951__auto___14912 = G__14913;
continue;
} else {
}
break;
}

var argseq__9958__auto__ = ((((2) < args__9957__auto__.length))?(new cljs.core.IndexedSeq(args__9957__auto__.slice((2)),(0),null)):null);
return mines.state.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__9958__auto__);
});

mines.state.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (thing,f,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.swap_BANG_,mines.state.app_state,cljs.core.update_in,thing,f,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([args], 0));
});

mines.state.update_state_BANG_.cljs$lang$maxFixedArity = (2);

mines.state.update_state_BANG_.cljs$lang$applyTo = (function (seq14908){
var G__14909 = cljs.core.first(seq14908);
var seq14908__$1 = cljs.core.next(seq14908);
var G__14910 = cljs.core.first(seq14908__$1);
var seq14908__$2 = cljs.core.next(seq14908__$1);
return mines.state.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14909,G__14910,seq14908__$2);
});

/**
 * Get indexes for mine-laying
 */
mines.state.mines = (function mines$state$mines(n){
var squared = (n * n);
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.take.cljs$core$IFn$_invoke$arity$2(((2) * n),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(((function (squared){
return (function (){
return Math.floor(cljs.core.mod((squared - (1)),(squared * Math.random())));
});})(squared))
))));
});
/**
 * Returns a vector of all neighboring cells to idx
 */
mines.state.get_neighbors = (function mines$state$get_neighbors(idx){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__14914_SHARP_){
var i = cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(p1__14914_SHARP_);
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(idx + (1)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(idx - (1)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(((9) - (1)) + idx))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,((9) + idx))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(((9) + (1)) + idx))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(idx - ((9) - (1))))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(idx - (9)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(idx - ((9) + (1)))));
}),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mines.state.app_state),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid], null)));
});
/**
 * Returns the number of adjacent cells to idx which contain a mine
 */
mines.state.get_neighbor_mines = (function mines$state$get_neighbor_mines(idx){
return cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__14915_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((10),cljs.core.cst$kw$val.cljs$core$IFn$_invoke$arity$1(p1__14915_SHARP_));
}),mines.state.get_neighbors(idx)));
});
/**
 * Increment score by 1
 */
mines.state.increase_score_BANG_ = (function mines$state$increase_score_BANG_(){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$score], null),cljs.core.inc);
});
/**
 * Decrement score by 1
 */
mines.state.decrease_score_BANG_ = (function mines$state$decrease_score_BANG_(){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$score], null),cljs.core.dec);
});
/**
 * Set score to 0
 */
mines.state.reset_score_BANG_ = (function mines$state$reset_score_BANG_(){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$score], null),(function (){
return cljs.core.identity((0));
}));
});
/**
 * Reset game grid to fresh 'grid-size' square, all vals zeroed.
 */
mines.state.blank_game_BANG_ = (function mines$state$blank_game_BANG_(grid_size){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid], null),(function (){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,(function (){var iter__9553__auto__ = (function mines$state$blank_game_BANG__$_iter__14916(s__14917){
return (new cljs.core.LazySeq(null,(function (){
var s__14917__$1 = s__14917;
while(true){
var temp__5457__auto__ = cljs.core.seq(s__14917__$1);
if(temp__5457__auto__){
var s__14917__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14917__$2)){
var c__9551__auto__ = cljs.core.chunk_first(s__14917__$2);
var size__9552__auto__ = cljs.core.count(c__9551__auto__);
var b__14919 = cljs.core.chunk_buffer(size__9552__auto__);
if((function (){var i__14918 = (0);
while(true){
if((i__14918 < size__9552__auto__)){
var idx = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__9551__auto__,i__14918);
cljs.core.chunk_append(b__14919,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$idx,idx,cljs.core.cst$kw$val,(0),cljs.core.cst$kw$status,"hidden"], null));

var G__14920 = (i__14918 + (1));
i__14918 = G__14920;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14919),mines$state$blank_game_BANG__$_iter__14916(cljs.core.chunk_rest(s__14917__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14919),null);
}
} else {
var idx = cljs.core.first(s__14917__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$idx,idx,cljs.core.cst$kw$val,(0),cljs.core.cst$kw$status,"hidden"], null),mines$state$blank_game_BANG__$_iter__14916(cljs.core.rest(s__14917__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__9553__auto__(cljs.core.take.cljs$core$IFn$_invoke$arity$2(Math.pow(grid_size,(2)),cljs.core.iterate(cljs.core.inc,(0))));
})());
}));
});
/**
 * Plant mines
 */
mines.state.lay_mines_BANG_ = (function mines$state$lay_mines_BANG_(num_mines){
var danger = mines.state.mines(num_mines);
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid], null),((function (danger){
return (function (p1__14921_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (danger){
return (function (a){
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(a)]),danger))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a,cljs.core.cst$kw$val,(10));
} else {
return cljs.core.identity(a);
}
});})(danger))
,p1__14921_SHARP_));
});})(danger))
);
});
/**
 * Replace cell vals with number of adjacent mines
 */
mines.state.apply_clues_BANG_ = (function mines$state$apply_clues_BANG_(){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid], null),(function (p1__14922_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (a){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((10),cljs.core.cst$kw$val.cljs$core$IFn$_invoke$arity$1(a))){
return cljs.core.identity(a);
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a,cljs.core.cst$kw$val,mines.state.get_neighbor_mines(cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(a)));
}
}),p1__14922_SHARP_));
}));
});
/**
 * Resets game
 */
mines.state.new_game_BANG_ = (function mines$state$new_game_BANG_(grid_size,num_mines){
mines.state.blank_game_BANG_(grid_size);

mines.state.lay_mines_BANG_(num_mines);

return mines.state.apply_clues_BANG_();
});
/**
 * Uncover cell at idx
 */
mines.state.reveal_BANG_ = (function mines$state$reveal_BANG_(idx){
var status = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mines.state.app_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid,idx,cljs.core.cst$kw$status], null));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(status,"flagged")){
return ((function (status){
return (function (){
return cljs.core.List.EMPTY;
});
;})(status))
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(status,"hidden")){
return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid,idx], null),((function (status){
return (function (p1__14923_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14923_SHARP_,cljs.core.cst$kw$status,"revealed");
});})(status))
);
} else {
return null;
}
}
});
/**
 * Toggle flag at idx
 */
mines.state.toggle_flag_BANG_ = (function mines$state$toggle_flag_BANG_(idx){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("hidden",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mines.state.app_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid,idx,cljs.core.cst$kw$status], null)))){
mines.state.increase_score_BANG_();

return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid,idx], null),(function (p1__14924_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14924_SHARP_,cljs.core.cst$kw$status,"flagged");
}));
} else {
mines.state.decrease_score_BANG_();

return mines.state.update_state_BANG_(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grid,idx], null),(function (p1__14925_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14925_SHARP_,cljs.core.cst$kw$status,"hidden");
}));
}
});
