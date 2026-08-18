window.__ModuleLoader__.load({ id: "dsh-workspace", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region node_modules/@xterm/xterm/lib/xterm.js
var require_xterm = /* @__PURE__ */ __commonJS({ "node_modules/@xterm/xterm/lib/xterm.js": ((exports, module) => {
	(function(e, t) {
		if ("object" == typeof exports && "object" == typeof module) module.exports = t();
		else if ("function" == typeof define && define.amd) define([], t);
		else {
			var i = t();
			for (var s in i) ("object" == typeof exports ? exports : e)[s] = i[s];
		}
	})(globalThis, (() => (() => {
		var e = {
			4567: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.AccessibilityManager = void 0;
				const n = i$1(9042), o = i$1(9924), a = i$1(844), h = i$1(4725), c$1 = i$1(2585), l = i$1(3656);
				let d = t$1.AccessibilityManager = class extends a.Disposable {
					constructor(e$2, t$2, i$2, s$2) {
						super(), this._terminal = e$2, this._coreBrowserService = i$2, this._renderService = s$2, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = this._coreBrowserService.mainDocument.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = this._coreBrowserService.mainDocument.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
						for (let e$3 = 0; e$3 < this._terminal.rows; e$3++) this._rowElements[e$3] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e$3]);
						if (this._topBoundaryFocusListener = (e$3) => this._handleBoundaryFocus(e$3, 0), this._bottomBoundaryFocusListener = (e$3) => this._handleBoundaryFocus(e$3, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = this._coreBrowserService.mainDocument.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new o.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
						this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize(((e$3) => this._handleResize(e$3.rows)))), this.register(this._terminal.onRender(((e$3) => this._refreshRows(e$3.start, e$3.end)))), this.register(this._terminal.onScroll((() => this._refreshRows()))), this.register(this._terminal.onA11yChar(((e$3) => this._handleChar(e$3)))), this.register(this._terminal.onLineFeed((() => this._handleChar("\n")))), this.register(this._terminal.onA11yTab(((e$3) => this._handleTab(e$3)))), this.register(this._terminal.onKey(((e$3) => this._handleKey(e$3.key)))), this.register(this._terminal.onBlur((() => this._clearLiveRegion()))), this.register(this._renderService.onDimensionsChange((() => this._refreshRowsDimensions()))), this.register((0, l.addDisposableDomListener)(document, "selectionchange", (() => this._handleSelectionChange()))), this.register(this._coreBrowserService.onDprChange((() => this._refreshRowsDimensions()))), this._refreshRows(), this.register((0, a.toDisposable)((() => {
							this._accessibilityContainer.remove(), this._rowElements.length = 0;
						})));
					}
					_handleTab(e$2) {
						for (let t$2 = 0; t$2 < e$2; t$2++) this._handleChar(" ");
					}
					_handleChar(e$2) {
						this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e$2 && (this._charsToAnnounce += e$2) : this._charsToAnnounce += e$2, "\n" === e$2 && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += n.tooMuchOutput)));
					}
					_clearLiveRegion() {
						this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
					}
					_handleKey(e$2) {
						this._clearLiveRegion(), /\p{Control}/u.test(e$2) || this._charsToConsume.push(e$2);
					}
					_refreshRows(e$2, t$2) {
						this._liveRegionDebouncer.refresh(e$2, t$2, this._terminal.rows);
					}
					_renderRows(e$2, t$2) {
						const i$2 = this._terminal.buffer, s$2 = i$2.lines.length.toString();
						for (let r$1 = e$2; r$1 <= t$2; r$1++) {
							const e$3 = i$2.lines.get(i$2.ydisp + r$1), t$3 = [], n$1 = e$3?.translateToString(!0, void 0, void 0, t$3) || "", o$1 = (i$2.ydisp + r$1 + 1).toString(), a$1 = this._rowElements[r$1];
							a$1 && (0 === n$1.length ? (a$1.innerText = "\xA0", this._rowColumns.set(a$1, [0, 1])) : (a$1.textContent = n$1, this._rowColumns.set(a$1, t$3)), a$1.setAttribute("aria-posinset", o$1), a$1.setAttribute("aria-setsize", s$2));
						}
						this._announceCharacters();
					}
					_announceCharacters() {
						0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
					}
					_handleBoundaryFocus(e$2, t$2) {
						const i$2 = e$2.target, s$2 = this._rowElements[0 === t$2 ? 1 : this._rowElements.length - 2];
						if (i$2.getAttribute("aria-posinset") === (0 === t$2 ? "1" : `${this._terminal.buffer.lines.length}`)) return;
						if (e$2.relatedTarget !== s$2) return;
						let r$1, n$1;
						if (0 === t$2 ? (r$1 = i$2, n$1 = this._rowElements.pop(), this._rowContainer.removeChild(n$1)) : (r$1 = this._rowElements.shift(), n$1 = i$2, this._rowContainer.removeChild(r$1)), r$1.removeEventListener("focus", this._topBoundaryFocusListener), n$1.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t$2) {
							const e$3 = this._createAccessibilityTreeNode();
							this._rowElements.unshift(e$3), this._rowContainer.insertAdjacentElement("afterbegin", e$3);
						} else {
							const e$3 = this._createAccessibilityTreeNode();
							this._rowElements.push(e$3), this._rowContainer.appendChild(e$3);
						}
						this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t$2 ? -1 : 1), this._rowElements[0 === t$2 ? 1 : this._rowElements.length - 2].focus(), e$2.preventDefault(), e$2.stopImmediatePropagation();
					}
					_handleSelectionChange() {
						if (0 === this._rowElements.length) return;
						const e$2 = document.getSelection();
						if (!e$2) return;
						if (e$2.isCollapsed) return void (this._rowContainer.contains(e$2.anchorNode) && this._terminal.clearSelection());
						if (!e$2.anchorNode || !e$2.focusNode) return void console.error("anchorNode and/or focusNode are null");
						let t$2 = {
							node: e$2.anchorNode,
							offset: e$2.anchorOffset
						}, i$2 = {
							node: e$2.focusNode,
							offset: e$2.focusOffset
						};
						if ((t$2.node.compareDocumentPosition(i$2.node) & Node.DOCUMENT_POSITION_PRECEDING || t$2.node === i$2.node && t$2.offset > i$2.offset) && ([t$2, i$2] = [i$2, t$2]), t$2.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t$2 = {
							node: this._rowElements[0].childNodes[0],
							offset: 0
						}), !this._rowContainer.contains(t$2.node)) return;
						const s$2 = this._rowElements.slice(-1)[0];
						if (i$2.node.compareDocumentPosition(s$2) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (i$2 = {
							node: s$2,
							offset: s$2.textContent?.length ?? 0
						}), !this._rowContainer.contains(i$2.node)) return;
						const r$1 = ({ node: e$3, offset: t$3 }) => {
							const i$3 = e$3 instanceof Text ? e$3.parentNode : e$3;
							let s$3 = parseInt(i$3?.getAttribute("aria-posinset"), 10) - 1;
							if (isNaN(s$3)) return console.warn("row is invalid. Race condition?"), null;
							const r$2 = this._rowColumns.get(i$3);
							if (!r$2) return console.warn("columns is null. Race condition?"), null;
							let n$2 = t$3 < r$2.length ? r$2[t$3] : r$2.slice(-1)[0] + 1;
							return n$2 >= this._terminal.cols && (++s$3, n$2 = 0), {
								row: s$3,
								column: n$2
							};
						}, n$1 = r$1(t$2), o$1 = r$1(i$2);
						if (n$1 && o$1) {
							if (n$1.row > o$1.row || n$1.row === o$1.row && n$1.column >= o$1.column) throw new Error("invalid range");
							this._terminal.select(n$1.column, n$1.row, (o$1.row - n$1.row) * this._terminal.cols - n$1.column + o$1.column);
						}
					}
					_handleResize(e$2) {
						this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
						for (let e$3 = this._rowContainer.children.length; e$3 < this._terminal.rows; e$3++) this._rowElements[e$3] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e$3]);
						for (; this._rowElements.length > e$2;) this._rowContainer.removeChild(this._rowElements.pop());
						this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
					}
					_createAccessibilityTreeNode() {
						const e$2 = this._coreBrowserService.mainDocument.createElement("div");
						return e$2.setAttribute("role", "listitem"), e$2.tabIndex = -1, this._refreshRowDimensions(e$2), e$2;
					}
					_refreshRowsDimensions() {
						if (this._renderService.dimensions.css.cell.height) {
							this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
							for (let e$2 = 0; e$2 < this._terminal.rows; e$2++) this._refreshRowDimensions(this._rowElements[e$2]);
						}
					}
					_refreshRowDimensions(e$2) {
						e$2.style.height = `${this._renderService.dimensions.css.cell.height}px`;
					}
				};
				t$1.AccessibilityManager = d = s$1([
					r(1, c$1.IInstantiationService),
					r(2, h.ICoreBrowserService),
					r(3, h.IRenderService)
				], d);
			},
			3614: (e$1, t$1) => {
				function i$1(e$2) {
					return e$2.replace(/\r?\n/g, "\r");
				}
				function s$1(e$2, t$2) {
					return t$2 ? "\x1B[200~" + e$2 + "\x1B[201~" : e$2;
				}
				function r(e$2, t$2, r$1, n$1) {
					e$2 = s$1(e$2 = i$1(e$2), r$1.decPrivateModes.bracketedPasteMode && !0 !== n$1.rawOptions.ignoreBracketedPasteMode), r$1.triggerDataEvent(e$2, !0), t$2.value = "";
				}
				function n(e$2, t$2, i$2) {
					const s$2 = i$2.getBoundingClientRect(), r$1 = e$2.clientX - s$2.left - 10, n$1 = e$2.clientY - s$2.top - 10;
					t$2.style.width = "20px", t$2.style.height = "20px", t$2.style.left = `${r$1}px`, t$2.style.top = `${n$1}px`, t$2.style.zIndex = "1000", t$2.focus();
				}
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.rightClickHandler = t$1.moveTextAreaUnderMouseCursor = t$1.paste = t$1.handlePasteEvent = t$1.copyHandler = t$1.bracketTextForPaste = t$1.prepareTextForTerminal = void 0, t$1.prepareTextForTerminal = i$1, t$1.bracketTextForPaste = s$1, t$1.copyHandler = function(e$2, t$2) {
					e$2.clipboardData && e$2.clipboardData.setData("text/plain", t$2.selectionText), e$2.preventDefault();
				}, t$1.handlePasteEvent = function(e$2, t$2, i$2, s$2) {
					e$2.stopPropagation(), e$2.clipboardData && r(e$2.clipboardData.getData("text/plain"), t$2, i$2, s$2);
				}, t$1.paste = r, t$1.moveTextAreaUnderMouseCursor = n, t$1.rightClickHandler = function(e$2, t$2, i$2, s$2, r$1) {
					n(e$2, t$2, i$2), r$1 && s$2.rightClickSelect(e$2), t$2.value = s$2.selectionText, t$2.select();
				};
			},
			7239: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ColorContrastCache = void 0;
				const s$1 = i$1(1505);
				t$1.ColorContrastCache = class {
					constructor() {
						this._color = new s$1.TwoKeyMap(), this._css = new s$1.TwoKeyMap();
					}
					setCss(e$2, t$2, i$2) {
						this._css.set(e$2, t$2, i$2);
					}
					getCss(e$2, t$2) {
						return this._css.get(e$2, t$2);
					}
					setColor(e$2, t$2, i$2) {
						this._color.set(e$2, t$2, i$2);
					}
					getColor(e$2, t$2) {
						return this._color.get(e$2, t$2);
					}
					clear() {
						this._color.clear(), this._css.clear();
					}
				};
			},
			3656: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.addDisposableDomListener = void 0, t$1.addDisposableDomListener = function(e$2, t$2, i$1, s$1) {
					e$2.addEventListener(t$2, i$1, s$1);
					let r = !1;
					return { dispose: () => {
						r || (r = !0, e$2.removeEventListener(t$2, i$1, s$1));
					} };
				};
			},
			3551: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Linkifier = void 0;
				const n = i$1(3656), o = i$1(8460), a = i$1(844), h = i$1(2585), c$1 = i$1(4725);
				let l = t$1.Linkifier = class extends a.Disposable {
					get currentLink() {
						return this._currentLink;
					}
					constructor(e$2, t$2, i$2, s$2, r$1) {
						super(), this._element = e$2, this._mouseService = t$2, this._renderService = i$2, this._bufferService = s$2, this._linkProviderService = r$1, this._linkCacheDisposables = [], this._isMouseOut = !0, this._wasResized = !1, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new o.EventEmitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, a.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, a.toDisposable)((() => {
							this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
						}))), this.register(this._bufferService.onResize((() => {
							this._clearCurrentLink(), this._wasResized = !0;
						}))), this.register((0, n.addDisposableDomListener)(this._element, "mouseleave", (() => {
							this._isMouseOut = !0, this._clearCurrentLink();
						}))), this.register((0, n.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
					}
					_handleMouseMove(e$2) {
						this._lastMouseEvent = e$2;
						const t$2 = this._positionFromMouseEvent(e$2, this._element, this._mouseService);
						if (!t$2) return;
						this._isMouseOut = !1;
						const i$2 = e$2.composedPath();
						for (let e$3 = 0; e$3 < i$2.length; e$3++) {
							const t$3 = i$2[e$3];
							if (t$3.classList.contains("xterm")) break;
							if (t$3.classList.contains("xterm-hover")) return;
						}
						this._lastBufferCell && t$2.x === this._lastBufferCell.x && t$2.y === this._lastBufferCell.y || (this._handleHover(t$2), this._lastBufferCell = t$2);
					}
					_handleHover(e$2) {
						if (this._activeLine !== e$2.y || this._wasResized) return this._clearCurrentLink(), this._askForLink(e$2, !1), void (this._wasResized = !1);
						this._currentLink && this._linkAtPosition(this._currentLink.link, e$2) || (this._clearCurrentLink(), this._askForLink(e$2, !0));
					}
					_askForLink(e$2, t$2) {
						this._activeProviderReplies && t$2 || (this._activeProviderReplies?.forEach(((e$3) => {
							e$3?.forEach(((e$4) => {
								e$4.link.dispose && e$4.link.dispose();
							}));
						})), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e$2.y);
						let i$2 = !1;
						for (const [s$2, r$1] of this._linkProviderService.linkProviders.entries()) if (t$2) this._activeProviderReplies?.get(s$2) && (i$2 = this._checkLinkProviderResult(s$2, e$2, i$2));
						else r$1.provideLinks(e$2.y, ((t$3) => {
							if (this._isMouseOut) return;
							const r$2 = t$3?.map(((e$3) => ({ link: e$3 })));
							this._activeProviderReplies?.set(s$2, r$2), i$2 = this._checkLinkProviderResult(s$2, e$2, i$2), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e$2.y, this._activeProviderReplies);
						}));
					}
					_removeIntersectingLinks(e$2, t$2) {
						const i$2 = /* @__PURE__ */ new Set();
						for (let s$2 = 0; s$2 < t$2.size; s$2++) {
							const r$1 = t$2.get(s$2);
							if (r$1) for (let t$3 = 0; t$3 < r$1.length; t$3++) {
								const s$3 = r$1[t$3], n$1 = s$3.link.range.start.y < e$2 ? 0 : s$3.link.range.start.x, o$1 = s$3.link.range.end.y > e$2 ? this._bufferService.cols : s$3.link.range.end.x;
								for (let e$3 = n$1; e$3 <= o$1; e$3++) {
									if (i$2.has(e$3)) {
										r$1.splice(t$3--, 1);
										break;
									}
									i$2.add(e$3);
								}
							}
						}
					}
					_checkLinkProviderResult(e$2, t$2, i$2) {
						if (!this._activeProviderReplies) return i$2;
						const s$2 = this._activeProviderReplies.get(e$2);
						let r$1 = !1;
						for (let t$3 = 0; t$3 < e$2; t$3++) this._activeProviderReplies.has(t$3) && !this._activeProviderReplies.get(t$3) || (r$1 = !0);
						if (!r$1 && s$2) {
							const e$3 = s$2.find(((e$4) => this._linkAtPosition(e$4.link, t$2)));
							e$3 && (i$2 = !0, this._handleNewLink(e$3));
						}
						if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !i$2) for (let e$3 = 0; e$3 < this._activeProviderReplies.size; e$3++) {
							const s$3 = this._activeProviderReplies.get(e$3)?.find(((e$4) => this._linkAtPosition(e$4.link, t$2)));
							if (s$3) {
								i$2 = !0, this._handleNewLink(s$3);
								break;
							}
						}
						return i$2;
					}
					_handleMouseDown() {
						this._mouseDownLink = this._currentLink;
					}
					_handleMouseUp(e$2) {
						if (!this._currentLink) return;
						const t$2 = this._positionFromMouseEvent(e$2, this._element, this._mouseService);
						t$2 && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t$2) && this._currentLink.link.activate(e$2, this._currentLink.link.text);
					}
					_clearCurrentLink(e$2, t$2) {
						this._currentLink && this._lastMouseEvent && (!e$2 || !t$2 || this._currentLink.link.range.start.y >= e$2 && this._currentLink.link.range.end.y <= t$2) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, a.disposeArray)(this._linkCacheDisposables));
					}
					_handleNewLink(e$2) {
						if (!this._lastMouseEvent) return;
						const t$2 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
						t$2 && this._linkAtPosition(e$2.link, t$2) && (this._currentLink = e$2, this._currentLink.state = {
							decorations: {
								underline: void 0 === e$2.link.decorations || e$2.link.decorations.underline,
								pointerCursor: void 0 === e$2.link.decorations || e$2.link.decorations.pointerCursor
							},
							isHovered: !0
						}, this._linkHover(this._element, e$2.link, this._lastMouseEvent), e$2.link.decorations = {}, Object.defineProperties(e$2.link.decorations, {
							pointerCursor: {
								get: () => this._currentLink?.state?.decorations.pointerCursor,
								set: (e$3) => {
									this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e$3 && (this._currentLink.state.decorations.pointerCursor = e$3, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", e$3));
								}
							},
							underline: {
								get: () => this._currentLink?.state?.decorations.underline,
								set: (t$3) => {
									this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t$3 && (this._currentLink.state.decorations.underline = t$3, this._currentLink.state.isHovered && this._fireUnderlineEvent(e$2.link, t$3));
								}
							}
						}), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(((e$3) => {
							if (!this._currentLink) return;
							const t$3 = 0 === e$3.start ? 0 : e$3.start + 1 + this._bufferService.buffer.ydisp, i$2 = this._bufferService.buffer.ydisp + 1 + e$3.end;
							if (this._currentLink.link.range.start.y >= t$3 && this._currentLink.link.range.end.y <= i$2 && (this._clearCurrentLink(t$3, i$2), this._lastMouseEvent)) {
								const e$4 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
								e$4 && this._askForLink(e$4, !1);
							}
						}))));
					}
					_linkHover(e$2, t$2, i$2) {
						this._currentLink?.state && (this._currentLink.state.isHovered = !0, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t$2, !0), this._currentLink.state.decorations.pointerCursor && e$2.classList.add("xterm-cursor-pointer")), t$2.hover && t$2.hover(i$2, t$2.text);
					}
					_fireUnderlineEvent(e$2, t$2) {
						const i$2 = e$2.range, s$2 = this._bufferService.buffer.ydisp, r$1 = this._createLinkUnderlineEvent(i$2.start.x - 1, i$2.start.y - s$2 - 1, i$2.end.x, i$2.end.y - s$2 - 1, void 0);
						(t$2 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r$1);
					}
					_linkLeave(e$2, t$2, i$2) {
						this._currentLink?.state && (this._currentLink.state.isHovered = !1, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t$2, !1), this._currentLink.state.decorations.pointerCursor && e$2.classList.remove("xterm-cursor-pointer")), t$2.leave && t$2.leave(i$2, t$2.text);
					}
					_linkAtPosition(e$2, t$2) {
						const i$2 = e$2.range.start.y * this._bufferService.cols + e$2.range.start.x, s$2 = e$2.range.end.y * this._bufferService.cols + e$2.range.end.x, r$1 = t$2.y * this._bufferService.cols + t$2.x;
						return i$2 <= r$1 && r$1 <= s$2;
					}
					_positionFromMouseEvent(e$2, t$2, i$2) {
						const s$2 = i$2.getCoords(e$2, t$2, this._bufferService.cols, this._bufferService.rows);
						if (s$2) return {
							x: s$2[0],
							y: s$2[1] + this._bufferService.buffer.ydisp
						};
					}
					_createLinkUnderlineEvent(e$2, t$2, i$2, s$2, r$1) {
						return {
							x1: e$2,
							y1: t$2,
							x2: i$2,
							y2: s$2,
							cols: this._bufferService.cols,
							fg: r$1
						};
					}
				};
				t$1.Linkifier = l = s$1([
					r(1, c$1.IMouseService),
					r(2, c$1.IRenderService),
					r(3, h.IBufferService),
					r(4, c$1.ILinkProviderService)
				], l);
			},
			9042: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.tooMuchOutput = t$1.promptLabel = void 0, t$1.promptLabel = "Terminal input", t$1.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
			},
			3730: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.OscLinkProvider = void 0;
				const n = i$1(511), o = i$1(2585);
				let a = t$1.OscLinkProvider = class {
					constructor(e$2, t$2, i$2) {
						this._bufferService = e$2, this._optionsService = t$2, this._oscLinkService = i$2;
					}
					provideLinks(e$2, t$2) {
						const i$2 = this._bufferService.buffer.lines.get(e$2 - 1);
						if (!i$2) return void t$2(void 0);
						const s$2 = [], r$1 = this._optionsService.rawOptions.linkHandler, o$1 = new n.CellData(), a$1 = i$2.getTrimmedLength();
						let c$1 = -1, l = -1, d = !1;
						for (let t$3 = 0; t$3 < a$1; t$3++) if (-1 !== l || i$2.hasContent(t$3)) {
							if (i$2.loadCell(t$3, o$1), o$1.hasExtendedAttrs() && o$1.extended.urlId) {
								if (-1 === l) {
									l = t$3, c$1 = o$1.extended.urlId;
									continue;
								}
								d = o$1.extended.urlId !== c$1;
							} else -1 !== l && (d = !0);
							if (d || -1 !== l && t$3 === a$1 - 1) {
								const i$3 = this._oscLinkService.getLinkData(c$1)?.uri;
								if (i$3) {
									const n$1 = {
										start: {
											x: l + 1,
											y: e$2
										},
										end: {
											x: t$3 + (d || t$3 !== a$1 - 1 ? 0 : 1),
											y: e$2
										}
									};
									let o$2 = !1;
									if (!r$1?.allowNonHttpProtocols) try {
										const e$3 = new URL(i$3);
										["http:", "https:"].includes(e$3.protocol) || (o$2 = !0);
									} catch (e$3) {
										o$2 = !0;
									}
									o$2 || s$2.push({
										text: i$3,
										range: n$1,
										activate: (e$3, t$4) => r$1 ? r$1.activate(e$3, t$4, n$1) : h(0, t$4),
										hover: (e$3, t$4) => r$1?.hover?.(e$3, t$4, n$1),
										leave: (e$3, t$4) => r$1?.leave?.(e$3, t$4, n$1)
									});
								}
								d = !1, o$1.hasExtendedAttrs() && o$1.extended.urlId ? (l = t$3, c$1 = o$1.extended.urlId) : (l = -1, c$1 = -1);
							}
						}
						t$2(s$2);
					}
				};
				function h(e$2, t$2) {
					if (confirm(`Do you want to navigate to ${t$2}?\n\nWARNING: This link could potentially be dangerous`)) {
						const e$3 = window.open();
						if (e$3) {
							try {
								e$3.opener = null;
							} catch {}
							e$3.location.href = t$2;
						} else console.warn("Opening link blocked as opener could not be cleared");
					}
				}
				t$1.OscLinkProvider = a = s$1([
					r(0, o.IBufferService),
					r(1, o.IOptionsService),
					r(2, o.IOscLinkService)
				], a);
			},
			6193: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.RenderDebouncer = void 0, t$1.RenderDebouncer = class {
					constructor(e$2, t$2) {
						this._renderCallback = e$2, this._coreBrowserService = t$2, this._refreshCallbacks = [];
					}
					dispose() {
						this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
					}
					addRefreshCallback(e$2) {
						return this._refreshCallbacks.push(e$2), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh()))), this._animationFrame;
					}
					refresh(e$2, t$2, i$1) {
						this._rowCount = i$1, e$2 = void 0 !== e$2 ? e$2 : 0, t$2 = void 0 !== t$2 ? t$2 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e$2) : e$2, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t$2) : t$2, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh())));
					}
					_innerRefresh() {
						if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return void this._runRefreshCallbacks();
						const e$2 = Math.max(this._rowStart, 0), t$2 = Math.min(this._rowEnd, this._rowCount - 1);
						this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e$2, t$2), this._runRefreshCallbacks();
					}
					_runRefreshCallbacks() {
						for (const e$2 of this._refreshCallbacks) e$2(0);
						this._refreshCallbacks = [];
					}
				};
			},
			3236: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Terminal = void 0;
				const s$1 = i$1(3614), r = i$1(3656), n = i$1(3551), o = i$1(9042), a = i$1(3730), h = i$1(1680), c$1 = i$1(3107), l = i$1(5744), d = i$1(2950), _ = i$1(1296), u = i$1(428), f = i$1(4269), v = i$1(5114), p = i$1(8934), g = i$1(3230), m = i$1(9312), S = i$1(4725), C = i$1(6731), b = i$1(8055), w = i$1(8969), y = i$1(8460), E = i$1(844), k = i$1(6114), L = i$1(8437), D = i$1(2584), R = i$1(7399), x = i$1(5941), A = i$1(9074), B = i$1(2585), T = i$1(5435), M = i$1(4567), O = i$1(779);
				class P extends w.CoreTerminal {
					get onFocus() {
						return this._onFocus.event;
					}
					get onBlur() {
						return this._onBlur.event;
					}
					get onA11yChar() {
						return this._onA11yCharEmitter.event;
					}
					get onA11yTab() {
						return this._onA11yTabEmitter.event;
					}
					get onWillOpen() {
						return this._onWillOpen.event;
					}
					constructor(e$2 = {}) {
						super(e$2), this.browser = k, this._keyDownHandled = !1, this._keyDownSeen = !1, this._keyPressHandled = !1, this._unprocessedDeadKey = !1, this._accessibilityManager = this.register(new E.MutableDisposable()), this._onCursorMove = this.register(new y.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new y.EventEmitter()), this.onKey = this._onKey.event, this._onRender = this.register(new y.EventEmitter()), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new y.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new y.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new y.EventEmitter()), this.onBell = this._onBell.event, this._onFocus = this.register(new y.EventEmitter()), this._onBlur = this.register(new y.EventEmitter()), this._onA11yCharEmitter = this.register(new y.EventEmitter()), this._onA11yTabEmitter = this.register(new y.EventEmitter()), this._onWillOpen = this.register(new y.EventEmitter()), this._setup(), this._decorationService = this._instantiationService.createInstance(A.DecorationService), this._instantiationService.setService(B.IDecorationService, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(O.LinkProviderService), this._instantiationService.setService(S.ILinkProviderService, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(a.OscLinkProvider)), this.register(this._inputHandler.onRequestBell((() => this._onBell.fire()))), this.register(this._inputHandler.onRequestRefreshRows(((e$3, t$2) => this.refresh(e$3, t$2)))), this.register(this._inputHandler.onRequestSendFocus((() => this._reportFocus()))), this.register(this._inputHandler.onRequestReset((() => this.reset()))), this.register(this._inputHandler.onRequestWindowsOptionsReport(((e$3) => this._reportWindowsOptions(e$3)))), this.register(this._inputHandler.onColor(((e$3) => this._handleColorEvent(e$3)))), this.register((0, y.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, y.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, y.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, y.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize(((e$3) => this._afterResize(e$3.cols, e$3.rows)))), this.register((0, E.toDisposable)((() => {
							this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
						})));
					}
					_handleColorEvent(e$2) {
						if (this._themeService) for (const t$2 of e$2) {
							let e$3, i$2 = "";
							switch (t$2.index) {
								case 256:
									e$3 = "foreground", i$2 = "10";
									break;
								case 257:
									e$3 = "background", i$2 = "11";
									break;
								case 258:
									e$3 = "cursor", i$2 = "12";
									break;
								default: e$3 = "ansi", i$2 = "4;" + t$2.index;
							}
							switch (t$2.type) {
								case 0:
									const s$2 = b.color.toColorRGB("ansi" === e$3 ? this._themeService.colors.ansi[t$2.index] : this._themeService.colors[e$3]);
									this.coreService.triggerDataEvent(`${D.C0.ESC}]${i$2};${(0, x.toRgbString)(s$2)}${D.C1_ESCAPED.ST}`);
									break;
								case 1:
									if ("ansi" === e$3) this._themeService.modifyColors(((e$4) => e$4.ansi[t$2.index] = b.channels.toColor(...t$2.color)));
									else {
										const i$3 = e$3;
										this._themeService.modifyColors(((e$4) => e$4[i$3] = b.channels.toColor(...t$2.color)));
									}
									break;
								case 2: this._themeService.restoreColor(t$2.index);
							}
						}
					}
					_setup() {
						super._setup(), this._customKeyEventHandler = void 0;
					}
					get buffer() {
						return this.buffers.active;
					}
					focus() {
						this.textarea && this.textarea.focus({ preventScroll: !0 });
					}
					_handleScreenReaderModeOptionChange(e$2) {
						e$2 ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)) : this._accessibilityManager.clear();
					}
					_handleTextAreaFocus(e$2) {
						this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
					}
					blur() {
						return this.textarea?.blur();
					}
					_handleTextAreaBlur() {
						this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
					}
					_syncTextArea() {
						if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
						const e$2 = this.buffer.ybase + this.buffer.y, t$2 = this.buffer.lines.get(e$2);
						if (!t$2) return;
						const i$2 = Math.min(this.buffer.x, this.cols - 1), s$2 = this._renderService.dimensions.css.cell.height, r$1 = t$2.getWidth(i$2), n$1 = this._renderService.dimensions.css.cell.width * r$1, o$1 = this.buffer.y * this._renderService.dimensions.css.cell.height, a$1 = i$2 * this._renderService.dimensions.css.cell.width;
						this.textarea.style.left = a$1 + "px", this.textarea.style.top = o$1 + "px", this.textarea.style.width = n$1 + "px", this.textarea.style.height = s$2 + "px", this.textarea.style.lineHeight = s$2 + "px", this.textarea.style.zIndex = "-5";
					}
					_initGlobal() {
						this._bindKeys(), this.register((0, r.addDisposableDomListener)(this.element, "copy", ((e$3) => {
							this.hasSelection() && (0, s$1.copyHandler)(e$3, this._selectionService);
						})));
						const e$2 = (e$3) => (0, s$1.handlePasteEvent)(e$3, this.textarea, this.coreService, this.optionsService);
						this.register((0, r.addDisposableDomListener)(this.textarea, "paste", e$2)), this.register((0, r.addDisposableDomListener)(this.element, "paste", e$2)), k.isFirefox ? this.register((0, r.addDisposableDomListener)(this.element, "mousedown", ((e$3) => {
							2 === e$3.button && (0, s$1.rightClickHandler)(e$3, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
						}))) : this.register((0, r.addDisposableDomListener)(this.element, "contextmenu", ((e$3) => {
							(0, s$1.rightClickHandler)(e$3, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
						}))), k.isLinux && this.register((0, r.addDisposableDomListener)(this.element, "auxclick", ((e$3) => {
							1 === e$3.button && (0, s$1.moveTextAreaUnderMouseCursor)(e$3, this.textarea, this.screenElement);
						})));
					}
					_bindKeys() {
						this.register((0, r.addDisposableDomListener)(this.textarea, "keyup", ((e$2) => this._keyUp(e$2)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "keydown", ((e$2) => this._keyDown(e$2)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "keypress", ((e$2) => this._keyPress(e$2)), !0)), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionstart", (() => this._compositionHelper.compositionstart()))), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionupdate", ((e$2) => this._compositionHelper.compositionupdate(e$2)))), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionend", (() => this._compositionHelper.compositionend()))), this.register((0, r.addDisposableDomListener)(this.textarea, "input", ((e$2) => this._inputEvent(e$2)), !0)), this.register(this.onRender((() => this._compositionHelper.updateCompositionElements())));
					}
					open(e$2) {
						if (!e$2) throw new Error("Terminal requires a parent element.");
						if (e$2.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) return void (this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView));
						this._document = e$2.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e$2.appendChild(this.element);
						const t$2 = this._document.createDocumentFragment();
						this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t$2.appendChild(this._viewportElement), this._viewportScrollArea = this._document.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this.register((0, r.addDisposableDomListener)(this.screenElement, "mousemove", ((e$3) => this.updateCursorStyle(e$3)))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t$2.appendChild(this.screenElement), this.textarea = this._document.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", o.promptLabel), k.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this.register(this._instantiationService.createInstance(v.CoreBrowserService, this.textarea, e$2.ownerDocument.defaultView ?? window, this._document ?? "undefined" != typeof window ? window.document : null)), this._instantiationService.setService(S.ICoreBrowserService, this._coreBrowserService), this.register((0, r.addDisposableDomListener)(this.textarea, "focus", ((e$3) => this._handleTextAreaFocus(e$3)))), this.register((0, r.addDisposableDomListener)(this.textarea, "blur", (() => this._handleTextAreaBlur()))), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(u.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(S.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(C.ThemeService), this._instantiationService.setService(S.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(f.CharacterJoinerService), this._instantiationService.setService(S.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(g.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(S.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange(((e$3) => this._onRender.fire(e$3)))), this.onResize(((e$3) => this._renderService.resize(e$3.cols, e$3.rows))), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(d.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(p.MouseService), this._instantiationService.setService(S.IMouseService, this._mouseService), this.linkifier = this.register(this._instantiationService.createInstance(n.Linkifier, this.screenElement)), this.element.appendChild(t$2);
						try {
							this._onWillOpen.fire(this.element);
						} catch {}
						this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this.viewport = this._instantiationService.createInstance(h.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines(((e$3) => this.scrollLines(e$3.amount, e$3.suppressScrollEvent, 1))), this.register(this._inputHandler.onRequestSyncScrollBar((() => this.viewport.syncScrollArea()))), this.register(this.viewport), this.register(this.onCursorMove((() => {
							this._renderService.handleCursorMove(), this._syncTextArea();
						}))), this.register(this.onResize((() => this._renderService.handleResize(this.cols, this.rows)))), this.register(this.onBlur((() => this._renderService.handleBlur()))), this.register(this.onFocus((() => this._renderService.handleFocus()))), this.register(this._renderService.onDimensionsChange((() => this.viewport.syncScrollArea()))), this._selectionService = this.register(this._instantiationService.createInstance(m.SelectionService, this.element, this.screenElement, this.linkifier)), this._instantiationService.setService(S.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines(((e$3) => this.scrollLines(e$3.amount, e$3.suppressScrollEvent)))), this.register(this._selectionService.onSelectionChange((() => this._onSelectionChange.fire()))), this.register(this._selectionService.onRequestRedraw(((e$3) => this._renderService.handleSelectionChanged(e$3.start, e$3.end, e$3.columnSelectMode)))), this.register(this._selectionService.onLinuxMouseSelection(((e$3) => {
							this.textarea.value = e$3, this.textarea.focus(), this.textarea.select();
						}))), this.register(this._onScroll.event(((e$3) => {
							this.viewport.syncScrollArea(), this._selectionService.refresh();
						}))), this.register((0, r.addDisposableDomListener)(this._viewportElement, "scroll", (() => this._selectionService.refresh()))), this.register(this._instantiationService.createInstance(c$1.BufferDecorationRenderer, this.screenElement)), this.register((0, r.addDisposableDomListener)(this.element, "mousedown", ((e$3) => this._selectionService.handleMouseDown(e$3)))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", ((e$3) => this._handleScreenReaderModeOptionChange(e$3)))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", ((e$3) => {
							!this._overviewRulerRenderer && e$3 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
						})), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
					}
					_createRenderer() {
						return this._instantiationService.createInstance(_.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
					}
					bindMouse() {
						const e$2 = this, t$2 = this.element;
						function i$2(t$3) {
							const i$3 = e$2._mouseService.getMouseReportCoords(t$3, e$2.screenElement);
							if (!i$3) return !1;
							let s$3, r$1;
							switch (t$3.overrideType || t$3.type) {
								case "mousemove":
									r$1 = 32, void 0 === t$3.buttons ? (s$3 = 3, void 0 !== t$3.button && (s$3 = t$3.button < 3 ? t$3.button : 3)) : s$3 = 1 & t$3.buttons ? 0 : 4 & t$3.buttons ? 1 : 2 & t$3.buttons ? 2 : 3;
									break;
								case "mouseup":
									r$1 = 0, s$3 = t$3.button < 3 ? t$3.button : 3;
									break;
								case "mousedown":
									r$1 = 1, s$3 = t$3.button < 3 ? t$3.button : 3;
									break;
								case "wheel":
									if (e$2._customWheelEventHandler && !1 === e$2._customWheelEventHandler(t$3)) return !1;
									if (0 === e$2.viewport.getLinesScrolled(t$3)) return !1;
									r$1 = t$3.deltaY < 0 ? 0 : 1, s$3 = 4;
									break;
								default: return !1;
							}
							return !(void 0 === r$1 || void 0 === s$3 || s$3 > 4) && e$2.coreMouseService.triggerMouseEvent({
								col: i$3.col,
								row: i$3.row,
								x: i$3.x,
								y: i$3.y,
								button: s$3,
								action: r$1,
								ctrl: t$3.ctrlKey,
								alt: t$3.altKey,
								shift: t$3.shiftKey
							});
						}
						const s$2 = {
							mouseup: null,
							wheel: null,
							mousedrag: null,
							mousemove: null
						}, n$1 = {
							mouseup: (e$3) => (i$2(e$3), e$3.buttons || (this._document.removeEventListener("mouseup", s$2.mouseup), s$2.mousedrag && this._document.removeEventListener("mousemove", s$2.mousedrag)), this.cancel(e$3)),
							wheel: (e$3) => (i$2(e$3), this.cancel(e$3, !0)),
							mousedrag: (e$3) => {
								e$3.buttons && i$2(e$3);
							},
							mousemove: (e$3) => {
								e$3.buttons || i$2(e$3);
							}
						};
						this.register(this.coreMouseService.onProtocolChange(((e$3) => {
							e$3 ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e$3)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e$3 ? s$2.mousemove || (t$2.addEventListener("mousemove", n$1.mousemove), s$2.mousemove = n$1.mousemove) : (t$2.removeEventListener("mousemove", s$2.mousemove), s$2.mousemove = null), 16 & e$3 ? s$2.wheel || (t$2.addEventListener("wheel", n$1.wheel, { passive: !1 }), s$2.wheel = n$1.wheel) : (t$2.removeEventListener("wheel", s$2.wheel), s$2.wheel = null), 2 & e$3 ? s$2.mouseup || (s$2.mouseup = n$1.mouseup) : (this._document.removeEventListener("mouseup", s$2.mouseup), s$2.mouseup = null), 4 & e$3 ? s$2.mousedrag || (s$2.mousedrag = n$1.mousedrag) : (this._document.removeEventListener("mousemove", s$2.mousedrag), s$2.mousedrag = null);
						}))), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, r.addDisposableDomListener)(t$2, "mousedown", ((e$3) => {
							if (e$3.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e$3)) return i$2(e$3), s$2.mouseup && this._document.addEventListener("mouseup", s$2.mouseup), s$2.mousedrag && this._document.addEventListener("mousemove", s$2.mousedrag), this.cancel(e$3);
						}))), this.register((0, r.addDisposableDomListener)(t$2, "wheel", ((e$3) => {
							if (!s$2.wheel) {
								if (this._customWheelEventHandler && !1 === this._customWheelEventHandler(e$3)) return !1;
								if (!this.buffer.hasScrollback) {
									const t$3 = this.viewport.getLinesScrolled(e$3);
									if (0 === t$3) return;
									const i$3 = D.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e$3.deltaY < 0 ? "A" : "B");
									let s$3 = "";
									for (let e$4 = 0; e$4 < Math.abs(t$3); e$4++) s$3 += i$3;
									return this.coreService.triggerDataEvent(s$3, !0), this.cancel(e$3, !0);
								}
								return this.viewport.handleWheel(e$3) ? this.cancel(e$3) : void 0;
							}
						}), { passive: !1 })), this.register((0, r.addDisposableDomListener)(t$2, "touchstart", ((e$3) => {
							if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchStart(e$3), this.cancel(e$3);
						}), { passive: !0 })), this.register((0, r.addDisposableDomListener)(t$2, "touchmove", ((e$3) => {
							if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchMove(e$3) ? void 0 : this.cancel(e$3);
						}), { passive: !1 }));
					}
					refresh(e$2, t$2) {
						this._renderService?.refreshRows(e$2, t$2);
					}
					updateCursorStyle(e$2) {
						this._selectionService?.shouldColumnSelect(e$2) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
					}
					_showCursor() {
						this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = !0, this.refresh(this.buffer.y, this.buffer.y));
					}
					scrollLines(e$2, t$2, i$2 = 0) {
						1 === i$2 ? (super.scrollLines(e$2, t$2, i$2), this.refresh(0, this.rows - 1)) : this.viewport?.scrollLines(e$2);
					}
					paste(e$2) {
						(0, s$1.paste)(e$2, this.textarea, this.coreService, this.optionsService);
					}
					attachCustomKeyEventHandler(e$2) {
						this._customKeyEventHandler = e$2;
					}
					attachCustomWheelEventHandler(e$2) {
						this._customWheelEventHandler = e$2;
					}
					registerLinkProvider(e$2) {
						return this._linkProviderService.registerLinkProvider(e$2);
					}
					registerCharacterJoiner(e$2) {
						if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
						const t$2 = this._characterJoinerService.register(e$2);
						return this.refresh(0, this.rows - 1), t$2;
					}
					deregisterCharacterJoiner(e$2) {
						if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
						this._characterJoinerService.deregister(e$2) && this.refresh(0, this.rows - 1);
					}
					get markers() {
						return this.buffer.markers;
					}
					registerMarker(e$2) {
						return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e$2);
					}
					registerDecoration(e$2) {
						return this._decorationService.registerDecoration(e$2);
					}
					hasSelection() {
						return !!this._selectionService && this._selectionService.hasSelection;
					}
					select(e$2, t$2, i$2) {
						this._selectionService.setSelection(e$2, t$2, i$2);
					}
					getSelection() {
						return this._selectionService ? this._selectionService.selectionText : "";
					}
					getSelectionPosition() {
						if (this._selectionService && this._selectionService.hasSelection) return {
							start: {
								x: this._selectionService.selectionStart[0],
								y: this._selectionService.selectionStart[1]
							},
							end: {
								x: this._selectionService.selectionEnd[0],
								y: this._selectionService.selectionEnd[1]
							}
						};
					}
					clearSelection() {
						this._selectionService?.clearSelection();
					}
					selectAll() {
						this._selectionService?.selectAll();
					}
					selectLines(e$2, t$2) {
						this._selectionService?.selectLines(e$2, t$2);
					}
					_keyDown(e$2) {
						if (this._keyDownHandled = !1, this._keyDownSeen = !0, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e$2)) return !1;
						const t$2 = this.browser.isMac && this.options.macOptionIsMeta && e$2.altKey;
						if (!t$2 && !this._compositionHelper.keydown(e$2)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), !1;
						t$2 || "Dead" !== e$2.key && "AltGraph" !== e$2.key || (this._unprocessedDeadKey = !0);
						const i$2 = (0, R.evaluateKeyboardEvent)(e$2, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
						if (this.updateCursorStyle(e$2), 3 === i$2.type || 2 === i$2.type) {
							const t$3 = this.rows - 1;
							return this.scrollLines(2 === i$2.type ? -t$3 : t$3), this.cancel(e$2, !0);
						}
						return 1 === i$2.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e$2) || (i$2.cancel && this.cancel(e$2, !0), !i$2.key || !!(e$2.key && !e$2.ctrlKey && !e$2.altKey && !e$2.metaKey && 1 === e$2.key.length && e$2.key.charCodeAt(0) >= 65 && e$2.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = !1, !0) : (i$2.key !== D.C0.ETX && i$2.key !== D.C0.CR || (this.textarea.value = ""), this._onKey.fire({
							key: i$2.key,
							domEvent: e$2
						}), this._showCursor(), this.coreService.triggerDataEvent(i$2.key, !0), !this.optionsService.rawOptions.screenReaderMode || e$2.altKey || e$2.ctrlKey ? this.cancel(e$2, !0) : void (this._keyDownHandled = !0))));
					}
					_isThirdLevelShift(e$2, t$2) {
						const i$2 = e$2.isMac && !this.options.macOptionIsMeta && t$2.altKey && !t$2.ctrlKey && !t$2.metaKey || e$2.isWindows && t$2.altKey && t$2.ctrlKey && !t$2.metaKey || e$2.isWindows && t$2.getModifierState("AltGraph");
						return "keypress" === t$2.type ? i$2 : i$2 && (!t$2.keyCode || t$2.keyCode > 47);
					}
					_keyUp(e$2) {
						this._keyDownSeen = !1, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e$2) || (function(e$3) {
							return 16 === e$3.keyCode || 17 === e$3.keyCode || 18 === e$3.keyCode;
						}(e$2) || this.focus(), this.updateCursorStyle(e$2), this._keyPressHandled = !1);
					}
					_keyPress(e$2) {
						let t$2;
						if (this._keyPressHandled = !1, this._keyDownHandled) return !1;
						if (this._customKeyEventHandler && !1 === this._customKeyEventHandler(e$2)) return !1;
						if (this.cancel(e$2), e$2.charCode) t$2 = e$2.charCode;
						else if (null === e$2.which || void 0 === e$2.which) t$2 = e$2.keyCode;
						else {
							if (0 === e$2.which || 0 === e$2.charCode) return !1;
							t$2 = e$2.which;
						}
						return !(!t$2 || (e$2.altKey || e$2.ctrlKey || e$2.metaKey) && !this._isThirdLevelShift(this.browser, e$2) || (t$2 = String.fromCharCode(t$2), this._onKey.fire({
							key: t$2,
							domEvent: e$2
						}), this._showCursor(), this.coreService.triggerDataEvent(t$2, !0), this._keyPressHandled = !0, this._unprocessedDeadKey = !1, 0));
					}
					_inputEvent(e$2) {
						if (e$2.data && "insertText" === e$2.inputType && (!e$2.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
							if (this._keyPressHandled) return !1;
							this._unprocessedDeadKey = !1;
							const t$2 = e$2.data;
							return this.coreService.triggerDataEvent(t$2, !0), this.cancel(e$2), !0;
						}
						return !1;
					}
					resize(e$2, t$2) {
						e$2 !== this.cols || t$2 !== this.rows ? super.resize(e$2, t$2) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
					}
					_afterResize(e$2, t$2) {
						this._charSizeService?.measure(), this.viewport?.syncScrollArea(!0);
					}
					clear() {
						if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
							this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
							for (let e$2 = 1; e$2 < this.rows; e$2++) this.buffer.lines.push(this.buffer.getBlankLine(L.DEFAULT_ATTR_DATA));
							this._onScroll.fire({
								position: this.buffer.ydisp,
								source: 0
							}), this.viewport?.reset(), this.refresh(0, this.rows - 1);
						}
					}
					reset() {
						this.options.rows = this.rows, this.options.cols = this.cols;
						const e$2 = this._customKeyEventHandler;
						this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this.viewport?.reset(), this._customKeyEventHandler = e$2, this.refresh(0, this.rows - 1);
					}
					clearTextureAtlas() {
						this._renderService?.clearTextureAtlas();
					}
					_reportFocus() {
						this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(D.C0.ESC + "[I") : this.coreService.triggerDataEvent(D.C0.ESC + "[O");
					}
					_reportWindowsOptions(e$2) {
						if (this._renderService) switch (e$2) {
							case T.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
								const e$3 = this._renderService.dimensions.css.canvas.width.toFixed(0), t$2 = this._renderService.dimensions.css.canvas.height.toFixed(0);
								this.coreService.triggerDataEvent(`${D.C0.ESC}[4;${t$2};${e$3}t`);
								break;
							case T.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
								const i$2 = this._renderService.dimensions.css.cell.width.toFixed(0), s$2 = this._renderService.dimensions.css.cell.height.toFixed(0);
								this.coreService.triggerDataEvent(`${D.C0.ESC}[6;${s$2};${i$2}t`);
						}
					}
					cancel(e$2, t$2) {
						if (this.options.cancelEvents || t$2) return e$2.preventDefault(), e$2.stopPropagation(), !1;
					}
				}
				t$1.Terminal = P;
			},
			9924: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.TimeBasedDebouncer = void 0, t$1.TimeBasedDebouncer = class {
					constructor(e$2, t$2 = 1e3) {
						this._renderCallback = e$2, this._debounceThresholdMS = t$2, this._lastRefreshMs = 0, this._additionalRefreshRequested = !1;
					}
					dispose() {
						this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
					}
					refresh(e$2, t$2, i$1) {
						this._rowCount = i$1, e$2 = void 0 !== e$2 ? e$2 : 0, t$2 = void 0 !== t$2 ? t$2 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e$2) : e$2, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t$2) : t$2;
						const s$1 = Date.now();
						if (s$1 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = s$1, this._innerRefresh();
						else if (!this._additionalRefreshRequested) {
							const e$3 = s$1 - this._lastRefreshMs, t$3 = this._debounceThresholdMS - e$3;
							this._additionalRefreshRequested = !0, this._refreshTimeoutID = window.setTimeout((() => {
								this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = !1, this._refreshTimeoutID = void 0;
							}), t$3);
						}
					}
					_innerRefresh() {
						if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return;
						const e$2 = Math.max(this._rowStart, 0), t$2 = Math.min(this._rowEnd, this._rowCount - 1);
						this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e$2, t$2);
					}
				};
			},
			1680: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Viewport = void 0;
				const n = i$1(3656), o = i$1(4725), a = i$1(8460), h = i$1(844), c$1 = i$1(2585);
				let l = t$1.Viewport = class extends h.Disposable {
					constructor(e$2, t$2, i$2, s$2, r$1, o$1, h$1, c$2) {
						super(), this._viewportElement = e$2, this._scrollArea = t$2, this._bufferService = i$2, this._optionsService = s$2, this._charSizeService = r$1, this._renderService = o$1, this._coreBrowserService = h$1, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = !1, this._smoothScrollState = {
							startTime: 0,
							origin: -1,
							target: -1
						}, this._onRequestScrollLines = this.register(new a.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, n.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate(((e$3) => this._activeBuffer = e$3.activeBuffer))), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange(((e$3) => this._renderDimensions = e$3))), this._handleThemeChange(c$2.colors), this.register(c$2.onChangeColors(((e$3) => this._handleThemeChange(e$3)))), this.register(this._optionsService.onSpecificOptionChange("scrollback", (() => this.syncScrollArea()))), setTimeout((() => this.syncScrollArea()));
					}
					_handleThemeChange(e$2) {
						this._viewportElement.style.backgroundColor = e$2.background.css;
					}
					reset() {
						this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame((() => this.syncScrollArea()));
					}
					_refresh(e$2) {
						if (e$2) return this._innerRefresh(), void (null !== this._refreshAnimationFrame && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
						null === this._refreshAnimationFrame && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh())));
					}
					_innerRefresh() {
						if (this._charSizeService.height > 0) {
							this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderDimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
							const e$3 = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
							this._lastRecordedBufferHeight !== e$3 && (this._lastRecordedBufferHeight = e$3, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
						}
						const e$2 = this._bufferService.buffer.ydisp * this._currentRowHeight;
						this._viewportElement.scrollTop !== e$2 && (this._ignoreNextScrollEvent = !0, this._viewportElement.scrollTop = e$2), this._refreshAnimationFrame = null;
					}
					syncScrollArea(e$2 = !1) {
						if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e$2);
						this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(e$2);
					}
					_handleScroll(e$2) {
						if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent) return;
						if (this._ignoreNextScrollEvent) return this._ignoreNextScrollEvent = !1, void this._onRequestScrollLines.fire({
							amount: 0,
							suppressScrollEvent: !0
						});
						const t$2 = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
						this._onRequestScrollLines.fire({
							amount: t$2,
							suppressScrollEvent: !0
						});
					}
					_smoothScroll() {
						if (this._isDisposed || -1 === this._smoothScrollState.origin || -1 === this._smoothScrollState.target) return;
						const e$2 = this._smoothScrollPercent();
						this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e$2 * (this._smoothScrollState.target - this._smoothScrollState.origin)), e$2 < 1 ? this._coreBrowserService.window.requestAnimationFrame((() => this._smoothScroll())) : this._clearSmoothScrollState();
					}
					_smoothScrollPercent() {
						return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
					}
					_clearSmoothScrollState() {
						this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
					}
					_bubbleScroll(e$2, t$2) {
						const i$2 = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
						return !(t$2 < 0 && 0 !== this._viewportElement.scrollTop || t$2 > 0 && i$2 < this._lastRecordedBufferHeight) || (e$2.cancelable && e$2.preventDefault(), !1);
					}
					handleWheel(e$2) {
						const t$2 = this._getPixelsScrolled(e$2);
						return 0 !== t$2 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, -1 === this._smoothScrollState.target ? this._smoothScrollState.target = this._viewportElement.scrollTop + t$2 : this._smoothScrollState.target += t$2, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t$2, this._bubbleScroll(e$2, t$2));
					}
					scrollLines(e$2) {
						if (0 !== e$2) if (this._optionsService.rawOptions.smoothScrollDuration) {
							const t$2 = e$2 * this._currentRowHeight;
							this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + t$2, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
						} else this._onRequestScrollLines.fire({
							amount: e$2,
							suppressScrollEvent: !1
						});
					}
					_getPixelsScrolled(e$2) {
						if (0 === e$2.deltaY || e$2.shiftKey) return 0;
						let t$2 = this._applyScrollModifier(e$2.deltaY, e$2);
						return e$2.deltaMode === WheelEvent.DOM_DELTA_LINE ? t$2 *= this._currentRowHeight : e$2.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t$2 *= this._currentRowHeight * this._bufferService.rows), t$2;
					}
					getBufferElements(e$2, t$2) {
						let i$2, s$2 = "";
						const r$1 = [], n$1 = t$2 ?? this._bufferService.buffer.lines.length, o$1 = this._bufferService.buffer.lines;
						for (let t$3 = e$2; t$3 < n$1; t$3++) {
							const e$3 = o$1.get(t$3);
							if (!e$3) continue;
							const n$2 = o$1.get(t$3 + 1)?.isWrapped;
							if (s$2 += e$3.translateToString(!n$2), !n$2 || t$3 === o$1.length - 1) {
								const e$4 = document.createElement("div");
								e$4.textContent = s$2, r$1.push(e$4), s$2.length > 0 && (i$2 = e$4), s$2 = "";
							}
						}
						return {
							bufferElements: r$1,
							cursorElement: i$2
						};
					}
					getLinesScrolled(e$2) {
						if (0 === e$2.deltaY || e$2.shiftKey) return 0;
						let t$2 = this._applyScrollModifier(e$2.deltaY, e$2);
						return e$2.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t$2 /= this._currentRowHeight + 0, this._wheelPartialScroll += t$2, t$2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e$2.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t$2 *= this._bufferService.rows), t$2;
					}
					_applyScrollModifier(e$2, t$2) {
						const i$2 = this._optionsService.rawOptions.fastScrollModifier;
						return "alt" === i$2 && t$2.altKey || "ctrl" === i$2 && t$2.ctrlKey || "shift" === i$2 && t$2.shiftKey ? e$2 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e$2 * this._optionsService.rawOptions.scrollSensitivity;
					}
					handleTouchStart(e$2) {
						this._lastTouchY = e$2.touches[0].pageY;
					}
					handleTouchMove(e$2) {
						const t$2 = this._lastTouchY - e$2.touches[0].pageY;
						return this._lastTouchY = e$2.touches[0].pageY, 0 !== t$2 && (this._viewportElement.scrollTop += t$2, this._bubbleScroll(e$2, t$2));
					}
				};
				t$1.Viewport = l = s$1([
					r(2, c$1.IBufferService),
					r(3, c$1.IOptionsService),
					r(4, o.ICharSizeService),
					r(5, o.IRenderService),
					r(6, o.ICoreBrowserService),
					r(7, o.IThemeService)
				], l);
			},
			3107: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferDecorationRenderer = void 0;
				const n = i$1(4725), o = i$1(844), a = i$1(2585);
				let h = t$1.BufferDecorationRenderer = class extends o.Disposable {
					constructor(e$2, t$2, i$2, s$2, r$1) {
						super(), this._screenElement = e$2, this._bufferService = t$2, this._coreBrowserService = i$2, this._decorationService = s$2, this._renderService = r$1, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = !1, this._dimensionsChanged = !1, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange((() => this._doRefreshDecorations()))), this.register(this._renderService.onDimensionsChange((() => {
							this._dimensionsChanged = !0, this._queueRefresh();
						}))), this.register(this._coreBrowserService.onDprChange((() => this._queueRefresh()))), this.register(this._bufferService.buffers.onBufferActivate((() => {
							this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
						}))), this.register(this._decorationService.onDecorationRegistered((() => this._queueRefresh()))), this.register(this._decorationService.onDecorationRemoved(((e$3) => this._removeDecoration(e$3)))), this.register((0, o.toDisposable)((() => {
							this._container.remove(), this._decorationElements.clear();
						})));
					}
					_queueRefresh() {
						void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback((() => {
							this._doRefreshDecorations(), this._animationFrame = void 0;
						})));
					}
					_doRefreshDecorations() {
						for (const e$2 of this._decorationService.decorations) this._renderDecoration(e$2);
						this._dimensionsChanged = !1;
					}
					_renderDecoration(e$2) {
						this._refreshStyle(e$2), this._dimensionsChanged && this._refreshXPosition(e$2);
					}
					_createElement(e$2) {
						const t$2 = this._coreBrowserService.mainDocument.createElement("div");
						t$2.classList.add("xterm-decoration"), t$2.classList.toggle("xterm-decoration-top-layer", "top" === e$2?.options?.layer), t$2.style.width = `${Math.round((e$2.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t$2.style.height = (e$2.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", t$2.style.top = (e$2.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", t$2.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
						const i$2 = e$2.options.x ?? 0;
						return i$2 && i$2 > this._bufferService.cols && (t$2.style.display = "none"), this._refreshXPosition(e$2, t$2), t$2;
					}
					_refreshStyle(e$2) {
						const t$2 = e$2.marker.line - this._bufferService.buffers.active.ydisp;
						if (t$2 < 0 || t$2 >= this._bufferService.rows) e$2.element && (e$2.element.style.display = "none", e$2.onRenderEmitter.fire(e$2.element));
						else {
							let i$2 = this._decorationElements.get(e$2);
							i$2 || (i$2 = this._createElement(e$2), e$2.element = i$2, this._decorationElements.set(e$2, i$2), this._container.appendChild(i$2), e$2.onDispose((() => {
								this._decorationElements.delete(e$2), i$2.remove();
							}))), i$2.style.top = t$2 * this._renderService.dimensions.css.cell.height + "px", i$2.style.display = this._altBufferIsActive ? "none" : "block", e$2.onRenderEmitter.fire(i$2);
						}
					}
					_refreshXPosition(e$2, t$2 = e$2.element) {
						if (!t$2) return;
						const i$2 = e$2.options.x ?? 0;
						"right" === (e$2.options.anchor || "left") ? t$2.style.right = i$2 ? i$2 * this._renderService.dimensions.css.cell.width + "px" : "" : t$2.style.left = i$2 ? i$2 * this._renderService.dimensions.css.cell.width + "px" : "";
					}
					_removeDecoration(e$2) {
						this._decorationElements.get(e$2)?.remove(), this._decorationElements.delete(e$2), e$2.dispose();
					}
				};
				t$1.BufferDecorationRenderer = h = s$1([
					r(1, a.IBufferService),
					r(2, n.ICoreBrowserService),
					r(3, a.IDecorationService),
					r(4, n.IRenderService)
				], h);
			},
			5871: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ColorZoneStore = void 0, t$1.ColorZoneStore = class {
					constructor() {
						this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = {
							full: 0,
							left: 0,
							center: 0,
							right: 0
						};
					}
					get zones() {
						return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
					}
					clear() {
						this._zones.length = 0, this._zonePoolIndex = 0;
					}
					addDecoration(e$2) {
						if (e$2.options.overviewRulerOptions) {
							for (const t$2 of this._zones) if (t$2.color === e$2.options.overviewRulerOptions.color && t$2.position === e$2.options.overviewRulerOptions.position) {
								if (this._lineIntersectsZone(t$2, e$2.marker.line)) return;
								if (this._lineAdjacentToZone(t$2, e$2.marker.line, e$2.options.overviewRulerOptions.position)) return void this._addLineToZone(t$2, e$2.marker.line);
							}
							if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = e$2.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e$2.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e$2.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e$2.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
							this._zones.push({
								color: e$2.options.overviewRulerOptions.color,
								position: e$2.options.overviewRulerOptions.position,
								startBufferLine: e$2.marker.line,
								endBufferLine: e$2.marker.line
							}), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
						}
					}
					setPadding(e$2) {
						this._linePadding = e$2;
					}
					_lineIntersectsZone(e$2, t$2) {
						return t$2 >= e$2.startBufferLine && t$2 <= e$2.endBufferLine;
					}
					_lineAdjacentToZone(e$2, t$2, i$1) {
						return t$2 >= e$2.startBufferLine - this._linePadding[i$1 || "full"] && t$2 <= e$2.endBufferLine + this._linePadding[i$1 || "full"];
					}
					_addLineToZone(e$2, t$2) {
						e$2.startBufferLine = Math.min(e$2.startBufferLine, t$2), e$2.endBufferLine = Math.max(e$2.endBufferLine, t$2);
					}
				};
			},
			5744: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.OverviewRulerRenderer = void 0;
				const n = i$1(5871), o = i$1(4725), a = i$1(844), h = i$1(2585), c$1 = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				}, l = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				}, d = {
					full: 0,
					left: 0,
					center: 0,
					right: 0
				};
				let _ = t$1.OverviewRulerRenderer = class extends a.Disposable {
					get _width() {
						return this._optionsService.options.overviewRulerWidth || 0;
					}
					constructor(e$2, t$2, i$2, s$2, r$1, o$1, h$1) {
						super(), this._viewportElement = e$2, this._screenElement = t$2, this._bufferService = i$2, this._decorationService = s$2, this._renderService = r$1, this._optionsService = o$1, this._coreBrowserService = h$1, this._colorZoneStore = new n.ColorZoneStore(), this._shouldUpdateDimensions = !0, this._shouldUpdateAnchor = !0, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement);
						const c$2 = this._canvas.getContext("2d");
						if (!c$2) throw new Error("Ctx cannot be null");
						this._ctx = c$2, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, a.toDisposable)((() => {
							this._canvas?.remove();
						})));
					}
					_registerDecorationListeners() {
						this.register(this._decorationService.onDecorationRegistered((() => this._queueRefresh(void 0, !0)))), this.register(this._decorationService.onDecorationRemoved((() => this._queueRefresh(void 0, !0))));
					}
					_registerBufferChangeListeners() {
						this.register(this._renderService.onRenderedViewportChange((() => this._queueRefresh()))), this.register(this._bufferService.buffers.onBufferActivate((() => {
							this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
						}))), this.register(this._bufferService.onScroll((() => {
							this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
						})));
					}
					_registerDimensionChangeListeners() {
						this.register(this._renderService.onRender((() => {
							this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(!0), this._containerHeight = this._screenElement.clientHeight);
						}))), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", (() => this._queueRefresh(!0)))), this.register(this._coreBrowserService.onDprChange((() => this._queueRefresh(!0)))), this._queueRefresh(!0);
					}
					_refreshDrawConstants() {
						const e$2 = Math.floor(this._canvas.width / 3), t$2 = Math.ceil(this._canvas.width / 3);
						l.full = this._canvas.width, l.left = e$2, l.center = t$2, l.right = e$2, this._refreshDrawHeightConstants(), d.full = 0, d.left = 0, d.center = l.left, d.right = l.left + l.center;
					}
					_refreshDrawHeightConstants() {
						c$1.full = Math.round(2 * this._coreBrowserService.dpr);
						const e$2 = this._canvas.height / this._bufferService.buffer.lines.length, t$2 = Math.round(Math.max(Math.min(e$2, 12), 6) * this._coreBrowserService.dpr);
						c$1.left = t$2, c$1.center = t$2, c$1.right = t$2;
					}
					_refreshColorZonePadding() {
						this._colorZoneStore.setPadding({
							full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c$1.full),
							left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c$1.left),
							center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c$1.center),
							right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c$1.right)
						}), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
					}
					_refreshCanvasDimensions() {
						this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
					}
					_refreshDecorations() {
						this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
						for (const e$3 of this._decorationService.decorations) this._colorZoneStore.addDecoration(e$3);
						this._ctx.lineWidth = 1;
						const e$2 = this._colorZoneStore.zones;
						for (const t$2 of e$2) "full" !== t$2.position && this._renderColorZone(t$2);
						for (const t$2 of e$2) "full" === t$2.position && this._renderColorZone(t$2);
						this._shouldUpdateDimensions = !1, this._shouldUpdateAnchor = !1;
					}
					_renderColorZone(e$2) {
						this._ctx.fillStyle = e$2.color, this._ctx.fillRect(d[e$2.position || "full"], Math.round((this._canvas.height - 1) * (e$2.startBufferLine / this._bufferService.buffers.active.lines.length) - c$1[e$2.position || "full"] / 2), l[e$2.position || "full"], Math.round((this._canvas.height - 1) * ((e$2.endBufferLine - e$2.startBufferLine) / this._bufferService.buffers.active.lines.length) + c$1[e$2.position || "full"]));
					}
					_queueRefresh(e$2, t$2) {
						this._shouldUpdateDimensions = e$2 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t$2 || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => {
							this._refreshDecorations(), this._animationFrame = void 0;
						})));
					}
				};
				t$1.OverviewRulerRenderer = _ = s$1([
					r(2, h.IBufferService),
					r(3, h.IDecorationService),
					r(4, o.IRenderService),
					r(5, h.IOptionsService),
					r(6, o.ICoreBrowserService)
				], _);
			},
			2950: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CompositionHelper = void 0;
				const n = i$1(4725), o = i$1(2585), a = i$1(2584);
				let h = t$1.CompositionHelper = class {
					get isComposing() {
						return this._isComposing;
					}
					constructor(e$2, t$2, i$2, s$2, r$1, n$1) {
						this._textarea = e$2, this._compositionView = t$2, this._bufferService = i$2, this._optionsService = s$2, this._coreService = r$1, this._renderService = n$1, this._isComposing = !1, this._isSendingComposition = !1, this._compositionPosition = {
							start: 0,
							end: 0
						}, this._dataAlreadySent = "";
					}
					compositionstart() {
						this._isComposing = !0, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
					}
					compositionupdate(e$2) {
						this._compositionView.textContent = e$2.data, this.updateCompositionElements(), setTimeout((() => {
							this._compositionPosition.end = this._textarea.value.length;
						}), 0);
					}
					compositionend() {
						this._finalizeComposition(!0);
					}
					keydown(e$2) {
						if (this._isComposing || this._isSendingComposition) {
							if (229 === e$2.keyCode) return !1;
							if (16 === e$2.keyCode || 17 === e$2.keyCode || 18 === e$2.keyCode) return !1;
							this._finalizeComposition(!1);
						}
						return 229 !== e$2.keyCode || (this._handleAnyTextareaChanges(), !1);
					}
					_finalizeComposition(e$2) {
						if (this._compositionView.classList.remove("active"), this._isComposing = !1, e$2) {
							const e$3 = {
								start: this._compositionPosition.start,
								end: this._compositionPosition.end
							};
							this._isSendingComposition = !0, setTimeout((() => {
								if (this._isSendingComposition) {
									let t$2;
									this._isSendingComposition = !1, e$3.start += this._dataAlreadySent.length, t$2 = this._isComposing ? this._textarea.value.substring(e$3.start, e$3.end) : this._textarea.value.substring(e$3.start), t$2.length > 0 && this._coreService.triggerDataEvent(t$2, !0);
								}
							}), 0);
						} else {
							this._isSendingComposition = !1;
							const e$3 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
							this._coreService.triggerDataEvent(e$3, !0);
						}
					}
					_handleAnyTextareaChanges() {
						const e$2 = this._textarea.value;
						setTimeout((() => {
							if (!this._isComposing) {
								const t$2 = this._textarea.value, i$2 = t$2.replace(e$2, "");
								this._dataAlreadySent = i$2, t$2.length > e$2.length ? this._coreService.triggerDataEvent(i$2, !0) : t$2.length < e$2.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, !0) : t$2.length === e$2.length && t$2 !== e$2 && this._coreService.triggerDataEvent(t$2, !0);
							}
						}), 0);
					}
					updateCompositionElements(e$2) {
						if (this._isComposing) {
							if (this._bufferService.buffer.isCursorInViewport) {
								const e$3 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t$2 = this._renderService.dimensions.css.cell.height, i$2 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s$2 = e$3 * this._renderService.dimensions.css.cell.width;
								this._compositionView.style.left = s$2 + "px", this._compositionView.style.top = i$2 + "px", this._compositionView.style.height = t$2 + "px", this._compositionView.style.lineHeight = t$2 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
								const r$1 = this._compositionView.getBoundingClientRect();
								this._textarea.style.left = s$2 + "px", this._textarea.style.top = i$2 + "px", this._textarea.style.width = Math.max(r$1.width, 1) + "px", this._textarea.style.height = Math.max(r$1.height, 1) + "px", this._textarea.style.lineHeight = r$1.height + "px";
							}
							e$2 || setTimeout((() => this.updateCompositionElements(!0)), 0);
						}
					}
				};
				t$1.CompositionHelper = h = s$1([
					r(2, o.IBufferService),
					r(3, o.IOptionsService),
					r(4, o.ICoreService),
					r(5, n.IRenderService)
				], h);
			},
			9806: (e$1, t$1) => {
				function i$1(e$2, t$2, i$2) {
					const s$1 = i$2.getBoundingClientRect(), r = e$2.getComputedStyle(i$2), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
					return [t$2.clientX - s$1.left - n, t$2.clientY - s$1.top - o];
				}
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.getCoords = t$1.getCoordsRelativeToElement = void 0, t$1.getCoordsRelativeToElement = i$1, t$1.getCoords = function(e$2, t$2, s$1, r, n, o, a, h, c$1) {
					if (!o) return;
					const l = i$1(e$2, t$2, s$1);
					return l ? (l[0] = Math.ceil((l[0] + (c$1 ? a / 2 : 0)) / a), l[1] = Math.ceil(l[1] / h), l[0] = Math.min(Math.max(l[0], 1), r + (c$1 ? 1 : 0)), l[1] = Math.min(Math.max(l[1], 1), n), l) : void 0;
				};
			},
			9504: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.moveToCellSequence = void 0;
				const s$1 = i$1(2584);
				function r(e$2, t$2, i$2, s$2) {
					const r$1 = e$2 - n(e$2, i$2), a$1 = t$2 - n(t$2, i$2);
					return c$1(Math.abs(r$1 - a$1) - function(e$3, t$3, i$3) {
						let s$3 = 0;
						const r$2 = e$3 - n(e$3, i$3), a$2 = t$3 - n(t$3, i$3);
						for (let n$1 = 0; n$1 < Math.abs(r$2 - a$2); n$1++) {
							const a$3 = "A" === o(e$3, t$3) ? -1 : 1;
							i$3.buffer.lines.get(r$2 + a$3 * n$1)?.isWrapped && s$3++;
						}
						return s$3;
					}(e$2, t$2, i$2), h(o(e$2, t$2), s$2));
				}
				function n(e$2, t$2) {
					let i$2 = 0, s$2 = t$2.buffer.lines.get(e$2), r$1 = s$2?.isWrapped;
					for (; r$1 && e$2 >= 0 && e$2 < t$2.rows;) i$2++, s$2 = t$2.buffer.lines.get(--e$2), r$1 = s$2?.isWrapped;
					return i$2;
				}
				function o(e$2, t$2) {
					return e$2 > t$2 ? "A" : "B";
				}
				function a(e$2, t$2, i$2, s$2, r$1, n$1) {
					let o$1 = e$2, a$1 = t$2, h$1 = "";
					for (; o$1 !== i$2 || a$1 !== s$2;) o$1 += r$1 ? 1 : -1, r$1 && o$1 > n$1.cols - 1 ? (h$1 += n$1.buffer.translateBufferLineToString(a$1, !1, e$2, o$1), o$1 = 0, e$2 = 0, a$1++) : !r$1 && o$1 < 0 && (h$1 += n$1.buffer.translateBufferLineToString(a$1, !1, 0, e$2 + 1), o$1 = n$1.cols - 1, e$2 = o$1, a$1--);
					return h$1 + n$1.buffer.translateBufferLineToString(a$1, !1, e$2, o$1);
				}
				function h(e$2, t$2) {
					const i$2 = t$2 ? "O" : "[";
					return s$1.C0.ESC + i$2 + e$2;
				}
				function c$1(e$2, t$2) {
					e$2 = Math.floor(e$2);
					let i$2 = "";
					for (let s$2 = 0; s$2 < e$2; s$2++) i$2 += t$2;
					return i$2;
				}
				t$1.moveToCellSequence = function(e$2, t$2, i$2, s$2) {
					const o$1 = i$2.buffer.x, l = i$2.buffer.y;
					if (!i$2.buffer.hasScrollback) return function(e$3, t$3, i$3, s$3, o$2, l$1) {
						return 0 === r(t$3, s$3, o$2, l$1).length ? "" : c$1(a(e$3, t$3, e$3, t$3 - n(t$3, o$2), !1, o$2).length, h("D", l$1));
					}(o$1, l, 0, t$2, i$2, s$2) + r(l, t$2, i$2, s$2) + function(e$3, t$3, i$3, s$3, o$2, l$1) {
						let d$1;
						d$1 = r(t$3, s$3, o$2, l$1).length > 0 ? s$3 - n(s$3, o$2) : t$3;
						const _$1 = s$3, u = function(e$4, t$4, i$4, s$4, o$3, a$1) {
							let h$1;
							return h$1 = r(i$4, s$4, o$3, a$1).length > 0 ? s$4 - n(s$4, o$3) : t$4, e$4 < i$4 && h$1 <= s$4 || e$4 >= i$4 && h$1 < s$4 ? "C" : "D";
						}(e$3, t$3, i$3, s$3, o$2, l$1);
						return c$1(a(e$3, d$1, i$3, _$1, "C" === u, o$2).length, h(u, l$1));
					}(o$1, l, e$2, t$2, i$2, s$2);
					let d;
					if (l === t$2) return d = o$1 > e$2 ? "D" : "C", c$1(Math.abs(o$1 - e$2), h(d, s$2));
					d = l > t$2 ? "D" : "C";
					const _ = Math.abs(l - t$2);
					return c$1(function(e$3, t$3) {
						return t$3.cols - e$3;
					}(l > t$2 ? e$2 : o$1, i$2) + (_ - 1) * i$2.cols + 1 + ((l > t$2 ? o$1 : e$2) - 1), h(d, s$2));
				};
			},
			1296: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DomRenderer = void 0;
				const n = i$1(3787), o = i$1(2550), a = i$1(2223), h = i$1(6171), c$1 = i$1(6052), l = i$1(4725), d = i$1(8055), _ = i$1(8460), u = i$1(844), f = i$1(2585), v = "xterm-dom-renderer-owner-", p = "xterm-rows", g = "xterm-fg-", m = "xterm-bg-", S = "xterm-focus", C = "xterm-selection";
				let b = 1, w = t$1.DomRenderer = class extends u.Disposable {
					constructor(e$2, t$2, i$2, s$2, r$1, a$1, l$1, d$1, f$1, g$1, m$1, S$1, w$1) {
						super(), this._terminal = e$2, this._document = t$2, this._element = i$2, this._screenElement = s$2, this._viewportElement = r$1, this._helperContainer = a$1, this._linkifier2 = l$1, this._charSizeService = f$1, this._optionsService = g$1, this._bufferService = m$1, this._coreBrowserService = S$1, this._themeService = w$1, this._terminalClass = b++, this._rowElements = [], this._selectionRenderModel = (0, c$1.createSelectionRenderModel)(), this.onRequestRedraw = this.register(new _.EventEmitter()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(p), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(C), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, h.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange((() => this._handleOptionsChanged()))), this.register(this._themeService.onChangeColors(((e$3) => this._injectCss(e$3)))), this._injectCss(this._themeService.colors), this._rowFactory = d$1.createInstance(n.DomRendererRowFactory, document), this._element.classList.add(v + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline(((e$3) => this._handleLinkHover(e$3)))), this.register(this._linkifier2.onHideLinkUnderline(((e$3) => this._handleLinkLeave(e$3)))), this.register((0, u.toDisposable)((() => {
							this._element.classList.remove(v + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
						}))), this._widthCache = new o.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
					}
					_updateDimensions() {
						const e$2 = this._coreBrowserService.dpr;
						this.dimensions.device.char.width = this._charSizeService.width * e$2, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e$2), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e$2), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e$2), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
						for (const e$3 of this._rowElements) e$3.style.width = `${this.dimensions.css.canvas.width}px`, e$3.style.height = `${this.dimensions.css.cell.height}px`, e$3.style.lineHeight = `${this.dimensions.css.cell.height}px`, e$3.style.overflow = "hidden";
						this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
						const t$2 = `${this._terminalSelector} .${p} span { display: inline-block; height: 100%; vertical-align: top;}`;
						this._dimensionsStyleElement.textContent = t$2, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
					}
					_injectCss(e$2) {
						this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
						let t$2 = `${this._terminalSelector} .${p} { color: ${e$2.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
						t$2 += `${this._terminalSelector} .${p} .xterm-dim { color: ${d.color.multiplyOpacity(e$2.foreground, .5).css};}`, t$2 += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
						const i$2 = `blink_underline_${this._terminalClass}`, s$2 = `blink_bar_${this._terminalClass}`, r$1 = `blink_block_${this._terminalClass}`;
						t$2 += `@keyframes ${i$2} { 50% {  border-bottom-style: hidden; }}`, t$2 += `@keyframes ${s$2} { 50% {  box-shadow: none; }}`, t$2 += `@keyframes ${r$1} { 0% {  background-color: ${e$2.cursor.css};  color: ${e$2.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e$2.cursor.css}; }}`, t$2 += `${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${i$2} 1s step-end infinite;}${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${s$2} 1s step-end infinite;}${this._terminalSelector} .${p}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${r$1} 1s step-end infinite;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-block { background-color: ${e$2.cursor.css}; color: ${e$2.cursorAccent.css};}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e$2.cursor.css} !important; color: ${e$2.cursorAccent.css} !important;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e$2.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e$2.cursor.css} inset;}${this._terminalSelector} .${p} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e$2.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t$2 += `${this._terminalSelector} .${C} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${C} div { position: absolute; background-color: ${e$2.selectionBackgroundOpaque.css};}${this._terminalSelector} .${C} div { position: absolute; background-color: ${e$2.selectionInactiveBackgroundOpaque.css};}`;
						for (const [i$3, s$3] of e$2.ansi.entries()) t$2 += `${this._terminalSelector} .${g}${i$3} { color: ${s$3.css}; }${this._terminalSelector} .${g}${i$3}.xterm-dim { color: ${d.color.multiplyOpacity(s$3, .5).css}; }${this._terminalSelector} .${m}${i$3} { background-color: ${s$3.css}; }`;
						t$2 += `${this._terminalSelector} .${g}${a.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(e$2.background).css}; }${this._terminalSelector} .${g}${a.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(e$2.background), .5).css}; }${this._terminalSelector} .${m}${a.INVERTED_DEFAULT_COLOR} { background-color: ${e$2.foreground.css}; }`, this._themeStyleElement.textContent = t$2;
					}
					_setDefaultSpacing() {
						const e$2 = this.dimensions.css.cell.width - this._widthCache.get("W", !1, !1);
						this._rowContainer.style.letterSpacing = `${e$2}px`, this._rowFactory.defaultSpacing = e$2;
					}
					handleDevicePixelRatioChange() {
						this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
					}
					_refreshRowElements(e$2, t$2) {
						for (let e$3 = this._rowElements.length; e$3 <= t$2; e$3++) {
							const e$4 = this._document.createElement("div");
							this._rowContainer.appendChild(e$4), this._rowElements.push(e$4);
						}
						for (; this._rowElements.length > t$2;) this._rowContainer.removeChild(this._rowElements.pop());
					}
					handleResize(e$2, t$2) {
						this._refreshRowElements(e$2, t$2), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
					}
					handleCharSizeChanged() {
						this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
					}
					handleBlur() {
						this._rowContainer.classList.remove(S), this.renderRows(0, this._bufferService.rows - 1);
					}
					handleFocus() {
						this._rowContainer.classList.add(S), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
					}
					handleSelectionChanged(e$2, t$2, i$2) {
						if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e$2, t$2, i$2), this.renderRows(0, this._bufferService.rows - 1), !e$2 || !t$2) return;
						this._selectionRenderModel.update(this._terminal, e$2, t$2, i$2);
						const s$2 = this._selectionRenderModel.viewportStartRow, r$1 = this._selectionRenderModel.viewportEndRow, n$1 = this._selectionRenderModel.viewportCappedStartRow, o$1 = this._selectionRenderModel.viewportCappedEndRow;
						if (n$1 >= this._bufferService.rows || o$1 < 0) return;
						const a$1 = this._document.createDocumentFragment();
						if (i$2) {
							const i$3 = e$2[0] > t$2[0];
							a$1.appendChild(this._createSelectionElement(n$1, i$3 ? t$2[0] : e$2[0], i$3 ? e$2[0] : t$2[0], o$1 - n$1 + 1));
						} else {
							const i$3 = s$2 === n$1 ? e$2[0] : 0, h$1 = n$1 === r$1 ? t$2[0] : this._bufferService.cols;
							a$1.appendChild(this._createSelectionElement(n$1, i$3, h$1));
							const c$2 = o$1 - n$1 - 1;
							if (a$1.appendChild(this._createSelectionElement(n$1 + 1, 0, this._bufferService.cols, c$2)), n$1 !== o$1) {
								const e$3 = r$1 === o$1 ? t$2[0] : this._bufferService.cols;
								a$1.appendChild(this._createSelectionElement(o$1, 0, e$3));
							}
						}
						this._selectionContainer.appendChild(a$1);
					}
					_createSelectionElement(e$2, t$2, i$2, s$2 = 1) {
						const r$1 = this._document.createElement("div"), n$1 = t$2 * this.dimensions.css.cell.width;
						let o$1 = this.dimensions.css.cell.width * (i$2 - t$2);
						return n$1 + o$1 > this.dimensions.css.canvas.width && (o$1 = this.dimensions.css.canvas.width - n$1), r$1.style.height = s$2 * this.dimensions.css.cell.height + "px", r$1.style.top = e$2 * this.dimensions.css.cell.height + "px", r$1.style.left = `${n$1}px`, r$1.style.width = `${o$1}px`, r$1;
					}
					handleCursorMove() {}
					_handleOptionsChanged() {
						this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
					}
					clear() {
						for (const e$2 of this._rowElements) e$2.replaceChildren();
					}
					renderRows(e$2, t$2) {
						const i$2 = this._bufferService.buffer, s$2 = i$2.ybase + i$2.y, r$1 = Math.min(i$2.x, this._bufferService.cols - 1), n$1 = this._optionsService.rawOptions.cursorBlink, o$1 = this._optionsService.rawOptions.cursorStyle, a$1 = this._optionsService.rawOptions.cursorInactiveStyle;
						for (let h$1 = e$2; h$1 <= t$2; h$1++) {
							const e$3 = h$1 + i$2.ydisp, t$3 = this._rowElements[h$1], c$2 = i$2.lines.get(e$3);
							if (!t$3 || !c$2) break;
							t$3.replaceChildren(...this._rowFactory.createRow(c$2, e$3, e$3 === s$2, o$1, a$1, r$1, n$1, this.dimensions.css.cell.width, this._widthCache, -1, -1));
						}
					}
					get _terminalSelector() {
						return `.${v}${this._terminalClass}`;
					}
					_handleLinkHover(e$2) {
						this._setCellUnderline(e$2.x1, e$2.x2, e$2.y1, e$2.y2, e$2.cols, !0);
					}
					_handleLinkLeave(e$2) {
						this._setCellUnderline(e$2.x1, e$2.x2, e$2.y1, e$2.y2, e$2.cols, !1);
					}
					_setCellUnderline(e$2, t$2, i$2, s$2, r$1, n$1) {
						i$2 < 0 && (e$2 = 0), s$2 < 0 && (t$2 = 0);
						const o$1 = this._bufferService.rows - 1;
						i$2 = Math.max(Math.min(i$2, o$1), 0), s$2 = Math.max(Math.min(s$2, o$1), 0), r$1 = Math.min(r$1, this._bufferService.cols);
						const a$1 = this._bufferService.buffer, h$1 = a$1.ybase + a$1.y, c$2 = Math.min(a$1.x, r$1 - 1), l$1 = this._optionsService.rawOptions.cursorBlink, d$1 = this._optionsService.rawOptions.cursorStyle, _$1 = this._optionsService.rawOptions.cursorInactiveStyle;
						for (let o$2 = i$2; o$2 <= s$2; ++o$2) {
							const u$1 = o$2 + a$1.ydisp, f$1 = this._rowElements[o$2], v$1 = a$1.lines.get(u$1);
							if (!f$1 || !v$1) break;
							f$1.replaceChildren(...this._rowFactory.createRow(v$1, u$1, u$1 === h$1, d$1, _$1, c$2, l$1, this.dimensions.css.cell.width, this._widthCache, n$1 ? o$2 === i$2 ? e$2 : 0 : -1, n$1 ? (o$2 === s$2 ? t$2 : r$1) - 1 : -1));
						}
					}
				};
				t$1.DomRenderer = w = s$1([
					r(7, f.IInstantiationService),
					r(8, l.ICharSizeService),
					r(9, f.IOptionsService),
					r(10, f.IBufferService),
					r(11, l.ICoreBrowserService),
					r(12, l.IThemeService)
				], w);
			},
			3787: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DomRendererRowFactory = void 0;
				const n = i$1(2223), o = i$1(643), a = i$1(511), h = i$1(2585), c$1 = i$1(8055), l = i$1(4725), d = i$1(4269), _ = i$1(6171), u = i$1(3734);
				let f = t$1.DomRendererRowFactory = class {
					constructor(e$2, t$2, i$2, s$2, r$1, n$1, o$1) {
						this._document = e$2, this._characterJoinerService = t$2, this._optionsService = i$2, this._coreBrowserService = s$2, this._coreService = r$1, this._decorationService = n$1, this._themeService = o$1, this._workCell = new a.CellData(), this._columnSelectMode = !1, this.defaultSpacing = 0;
					}
					handleSelectionChanged(e$2, t$2, i$2) {
						this._selectionStart = e$2, this._selectionEnd = t$2, this._columnSelectMode = i$2;
					}
					createRow(e$2, t$2, i$2, s$2, r$1, a$1, h$1, l$1, _$1, f$1, p) {
						const g = [], m = this._characterJoinerService.getJoinedCharacters(t$2), S = this._themeService.colors;
						let C, b = e$2.getNoBgTrimmedLength();
						i$2 && b < a$1 + 1 && (b = a$1 + 1);
						let w = 0, y = "", E = 0, k = 0, L = 0, D = !1, R = 0, x = !1, A = 0;
						const B = [], T = -1 !== f$1 && -1 !== p;
						for (let M = 0; M < b; M++) {
							e$2.loadCell(M, this._workCell);
							let b$1 = this._workCell.getWidth();
							if (0 === b$1) continue;
							let O = !1, P = M, I = this._workCell;
							if (m.length > 0 && M === m[0][0]) {
								O = !0;
								const t$3 = m.shift();
								I = new d.JoinedCellData(this._workCell, e$2.translateToString(!0, t$3[0], t$3[1]), t$3[1] - t$3[0]), P = t$3[1] - 1, b$1 = I.getWidth();
							}
							const H = this._isCellInSelection(M, t$2), F = i$2 && M === a$1, W = T && M >= f$1 && M <= p;
							let U = !1;
							this._decorationService.forEachDecorationAtCell(M, t$2, void 0, ((e$3) => {
								U = !0;
							}));
							let N = I.getChars() || o.WHITESPACE_CELL_CHAR;
							if (" " === N && (I.isUnderline() || I.isOverline()) && (N = "\xA0"), A = b$1 * l$1 - _$1.get(N, I.isBold(), I.isItalic()), C) {
								if (w && (H && x || !H && !x && I.bg === E) && (H && x && S.selectionForeground || I.fg === k) && I.extended.ext === L && W === D && A === R && !F && !O && !U) {
									I.isInvisible() ? y += o.WHITESPACE_CELL_CHAR : y += N, w++;
									continue;
								}
								w && (C.textContent = y), C = this._document.createElement("span"), w = 0, y = "";
							} else C = this._document.createElement("span");
							if (E = I.bg, k = I.fg, L = I.extended.ext, D = W, R = A, x = H, O && a$1 >= M && a$1 <= P && (a$1 = M), !this._coreService.isCursorHidden && F && this._coreService.isCursorInitialized) {
								if (B.push("xterm-cursor"), this._coreBrowserService.isFocused) h$1 && B.push("xterm-cursor-blink"), B.push("bar" === s$2 ? "xterm-cursor-bar" : "underline" === s$2 ? "xterm-cursor-underline" : "xterm-cursor-block");
								else if (r$1) switch (r$1) {
									case "outline":
										B.push("xterm-cursor-outline");
										break;
									case "block":
										B.push("xterm-cursor-block");
										break;
									case "bar":
										B.push("xterm-cursor-bar");
										break;
									case "underline": B.push("xterm-cursor-underline");
								}
							}
							if (I.isBold() && B.push("xterm-bold"), I.isItalic() && B.push("xterm-italic"), I.isDim() && B.push("xterm-dim"), y = I.isInvisible() ? o.WHITESPACE_CELL_CHAR : I.getChars() || o.WHITESPACE_CELL_CHAR, I.isUnderline() && (B.push(`xterm-underline-${I.extended.underlineStyle}`), " " === y && (y = "\xA0"), !I.isUnderlineColorDefault())) if (I.isUnderlineColorRGB()) C.style.textDecorationColor = `rgb(${u.AttributeData.toColorRGB(I.getUnderlineColor()).join(",")})`;
							else {
								let e$3 = I.getUnderlineColor();
								this._optionsService.rawOptions.drawBoldTextInBrightColors && I.isBold() && e$3 < 8 && (e$3 += 8), C.style.textDecorationColor = S.ansi[e$3].css;
							}
							I.isOverline() && (B.push("xterm-overline"), " " === y && (y = "\xA0")), I.isStrikethrough() && B.push("xterm-strikethrough"), W && (C.style.textDecoration = "underline");
							let $ = I.getFgColor(), j = I.getFgColorMode(), z = I.getBgColor(), K = I.getBgColorMode();
							const q = !!I.isInverse();
							if (q) {
								const e$3 = $;
								$ = z, z = e$3;
								const t$3 = j;
								j = K, K = t$3;
							}
							let V, G, X$1, J = !1;
							switch (this._decorationService.forEachDecorationAtCell(M, t$2, void 0, ((e$3) => {
								"top" !== e$3.options.layer && J || (e$3.backgroundColorRGB && (K = 50331648, z = e$3.backgroundColorRGB.rgba >> 8 & 16777215, V = e$3.backgroundColorRGB), e$3.foregroundColorRGB && (j = 50331648, $ = e$3.foregroundColorRGB.rgba >> 8 & 16777215, G = e$3.foregroundColorRGB), J = "top" === e$3.options.layer);
							})), !J && H && (V = this._coreBrowserService.isFocused ? S.selectionBackgroundOpaque : S.selectionInactiveBackgroundOpaque, z = V.rgba >> 8 & 16777215, K = 50331648, J = !0, S.selectionForeground && (j = 50331648, $ = S.selectionForeground.rgba >> 8 & 16777215, G = S.selectionForeground)), J && B.push("xterm-decoration-top"), K) {
								case 16777216:
								case 33554432:
									X$1 = S.ansi[z], B.push(`xterm-bg-${z}`);
									break;
								case 50331648:
									X$1 = c$1.channels.toColor(z >> 16, z >> 8 & 255, 255 & z), this._addStyle(C, `background-color:#${v((z >>> 0).toString(16), "0", 6)}`);
									break;
								default: q ? (X$1 = S.foreground, B.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : X$1 = S.background;
							}
							switch (V || I.isDim() && (V = c$1.color.multiplyOpacity(X$1, .5)), j) {
								case 16777216:
								case 33554432:
									I.isBold() && $ < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && ($ += 8), this._applyMinimumContrast(C, X$1, S.ansi[$], I, V, void 0) || B.push(`xterm-fg-${$}`);
									break;
								case 50331648:
									const e$3 = c$1.channels.toColor($ >> 16 & 255, $ >> 8 & 255, 255 & $);
									this._applyMinimumContrast(C, X$1, e$3, I, V, G) || this._addStyle(C, `color:#${v($.toString(16), "0", 6)}`);
									break;
								default: this._applyMinimumContrast(C, X$1, S.foreground, I, V, G) || q && B.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
							}
							B.length && (C.className = B.join(" "), B.length = 0), F || O || U ? C.textContent = y : w++, A !== this.defaultSpacing && (C.style.letterSpacing = `${A}px`), g.push(C), M = P;
						}
						return C && w && (C.textContent = y), g;
					}
					_applyMinimumContrast(e$2, t$2, i$2, s$2, r$1, n$1) {
						if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, _.treatGlyphAsBackgroundColor)(s$2.getCode())) return !1;
						const o$1 = this._getContrastCache(s$2);
						let a$1;
						if (r$1 || n$1 || (a$1 = o$1.getColor(t$2.rgba, i$2.rgba)), void 0 === a$1) {
							const e$3 = this._optionsService.rawOptions.minimumContrastRatio / (s$2.isDim() ? 2 : 1);
							a$1 = c$1.color.ensureContrastRatio(r$1 || t$2, n$1 || i$2, e$3), o$1.setColor((r$1 || t$2).rgba, (n$1 || i$2).rgba, a$1 ?? null);
						}
						return !!a$1 && (this._addStyle(e$2, `color:${a$1.css}`), !0);
					}
					_getContrastCache(e$2) {
						return e$2.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
					}
					_addStyle(e$2, t$2) {
						e$2.setAttribute("style", `${e$2.getAttribute("style") || ""}${t$2};`);
					}
					_isCellInSelection(e$2, t$2) {
						const i$2 = this._selectionStart, s$2 = this._selectionEnd;
						return !(!i$2 || !s$2) && (this._columnSelectMode ? i$2[0] <= s$2[0] ? e$2 >= i$2[0] && t$2 >= i$2[1] && e$2 < s$2[0] && t$2 <= s$2[1] : e$2 < i$2[0] && t$2 >= i$2[1] && e$2 >= s$2[0] && t$2 <= s$2[1] : t$2 > i$2[1] && t$2 < s$2[1] || i$2[1] === s$2[1] && t$2 === i$2[1] && e$2 >= i$2[0] && e$2 < s$2[0] || i$2[1] < s$2[1] && t$2 === s$2[1] && e$2 < s$2[0] || i$2[1] < s$2[1] && t$2 === i$2[1] && e$2 >= i$2[0]);
					}
				};
				function v(e$2, t$2, i$2) {
					for (; e$2.length < i$2;) e$2 = t$2 + e$2;
					return e$2;
				}
				t$1.DomRendererRowFactory = f = s$1([
					r(1, l.ICharacterJoinerService),
					r(2, h.IOptionsService),
					r(3, l.ICoreBrowserService),
					r(4, h.ICoreService),
					r(5, h.IDecorationService),
					r(6, l.IThemeService)
				], f);
			},
			2550: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.WidthCache = void 0, t$1.WidthCache = class {
					constructor(e$2, t$2) {
						this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e$2.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
						const i$1 = e$2.createElement("span");
						i$1.classList.add("xterm-char-measure-element");
						const s$1 = e$2.createElement("span");
						s$1.classList.add("xterm-char-measure-element"), s$1.style.fontWeight = "bold";
						const r = e$2.createElement("span");
						r.classList.add("xterm-char-measure-element"), r.style.fontStyle = "italic";
						const n = e$2.createElement("span");
						n.classList.add("xterm-char-measure-element"), n.style.fontWeight = "bold", n.style.fontStyle = "italic", this._measureElements = [
							i$1,
							s$1,
							r,
							n
						], this._container.appendChild(i$1), this._container.appendChild(s$1), this._container.appendChild(r), this._container.appendChild(n), t$2.appendChild(this._container), this.clear();
					}
					dispose() {
						this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
					}
					clear() {
						this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
					}
					setFont(e$2, t$2, i$1, s$1) {
						e$2 === this._font && t$2 === this._fontSize && i$1 === this._weight && s$1 === this._weightBold || (this._font = e$2, this._fontSize = t$2, this._weight = i$1, this._weightBold = s$1, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i$1}`, this._measureElements[1].style.fontWeight = `${s$1}`, this._measureElements[2].style.fontWeight = `${i$1}`, this._measureElements[3].style.fontWeight = `${s$1}`, this.clear());
					}
					get(e$2, t$2, i$1) {
						let s$1 = 0;
						if (!t$2 && !i$1 && 1 === e$2.length && (s$1 = e$2.charCodeAt(0)) < 256) {
							if (-9999 !== this._flat[s$1]) return this._flat[s$1];
							const t$3 = this._measure(e$2, 0);
							return t$3 > 0 && (this._flat[s$1] = t$3), t$3;
						}
						let r = e$2;
						t$2 && (r += "B"), i$1 && (r += "I");
						let n = this._holey.get(r);
						if (void 0 === n) {
							let s$2 = 0;
							t$2 && (s$2 |= 1), i$1 && (s$2 |= 2), n = this._measure(e$2, s$2), n > 0 && this._holey.set(r, n);
						}
						return n;
					}
					_measure(e$2, t$2) {
						const i$1 = this._measureElements[t$2];
						return i$1.textContent = e$2.repeat(32), i$1.offsetWidth / 32;
					}
				};
			},
			2223: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.TEXT_BASELINE = t$1.DIM_OPACITY = t$1.INVERTED_DEFAULT_COLOR = void 0;
				const s$1 = i$1(6114);
				t$1.INVERTED_DEFAULT_COLOR = 257, t$1.DIM_OPACITY = .5, t$1.TEXT_BASELINE = s$1.isFirefox || s$1.isLegacyEdge ? "bottom" : "ideographic";
			},
			6171: (e$1, t$1) => {
				function i$1(e$2) {
					return 57508 <= e$2 && e$2 <= 57558;
				}
				function s$1(e$2) {
					return e$2 >= 128512 && e$2 <= 128591 || e$2 >= 127744 && e$2 <= 128511 || e$2 >= 128640 && e$2 <= 128767 || e$2 >= 9728 && e$2 <= 9983 || e$2 >= 9984 && e$2 <= 10175 || e$2 >= 65024 && e$2 <= 65039 || e$2 >= 129280 && e$2 <= 129535 || e$2 >= 127462 && e$2 <= 127487;
				}
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.computeNextVariantOffset = t$1.createRenderDimensions = t$1.treatGlyphAsBackgroundColor = t$1.allowRescaling = t$1.isEmoji = t$1.isRestrictedPowerlineGlyph = t$1.isPowerlineGlyph = t$1.throwIfFalsy = void 0, t$1.throwIfFalsy = function(e$2) {
					if (!e$2) throw new Error("value must not be falsy");
					return e$2;
				}, t$1.isPowerlineGlyph = i$1, t$1.isRestrictedPowerlineGlyph = function(e$2) {
					return 57520 <= e$2 && e$2 <= 57527;
				}, t$1.isEmoji = s$1, t$1.allowRescaling = function(e$2, t$2, r, n) {
					return 1 === t$2 && r > Math.ceil(1.5 * n) && void 0 !== e$2 && e$2 > 255 && !s$1(e$2) && !i$1(e$2) && !function(e$3) {
						return 57344 <= e$3 && e$3 <= 63743;
					}(e$2);
				}, t$1.treatGlyphAsBackgroundColor = function(e$2) {
					return i$1(e$2) || function(e$3) {
						return 9472 <= e$3 && e$3 <= 9631;
					}(e$2);
				}, t$1.createRenderDimensions = function() {
					return {
						css: {
							canvas: {
								width: 0,
								height: 0
							},
							cell: {
								width: 0,
								height: 0
							}
						},
						device: {
							canvas: {
								width: 0,
								height: 0
							},
							cell: {
								width: 0,
								height: 0
							},
							char: {
								width: 0,
								height: 0,
								left: 0,
								top: 0
							}
						}
					};
				}, t$1.computeNextVariantOffset = function(e$2, t$2, i$2 = 0) {
					return (e$2 - (2 * Math.round(t$2) - i$2)) % (2 * Math.round(t$2));
				};
			},
			6052: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.createSelectionRenderModel = void 0;
				class i$1 {
					constructor() {
						this.clear();
					}
					clear() {
						this.hasSelection = !1, this.columnSelectMode = !1, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
					}
					update(e$2, t$2, i$2, s$1 = !1) {
						if (this.selectionStart = t$2, this.selectionEnd = i$2, !t$2 || !i$2 || t$2[0] === i$2[0] && t$2[1] === i$2[1]) return void this.clear();
						const r = e$2.buffers.active.ydisp, n = t$2[1] - r, o = i$2[1] - r, a = Math.max(n, 0), h = Math.min(o, e$2.rows - 1);
						a >= e$2.rows || h < 0 ? this.clear() : (this.hasSelection = !0, this.columnSelectMode = s$1, this.viewportStartRow = n, this.viewportEndRow = o, this.viewportCappedStartRow = a, this.viewportCappedEndRow = h, this.startCol = t$2[0], this.endCol = i$2[0]);
					}
					isCellSelected(e$2, t$2, i$2) {
						return !!this.hasSelection && (i$2 -= e$2.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t$2 >= this.startCol && i$2 >= this.viewportCappedStartRow && t$2 < this.endCol && i$2 <= this.viewportCappedEndRow : t$2 < this.startCol && i$2 >= this.viewportCappedStartRow && t$2 >= this.endCol && i$2 <= this.viewportCappedEndRow : i$2 > this.viewportStartRow && i$2 < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i$2 === this.viewportStartRow && t$2 >= this.startCol && t$2 < this.endCol || this.viewportStartRow < this.viewportEndRow && i$2 === this.viewportEndRow && t$2 < this.endCol || this.viewportStartRow < this.viewportEndRow && i$2 === this.viewportStartRow && t$2 >= this.startCol);
					}
				}
				t$1.createSelectionRenderModel = function() {
					return new i$1();
				};
			},
			456: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.SelectionModel = void 0, t$1.SelectionModel = class {
					constructor(e$2) {
						this._bufferService = e$2, this.isSelectAllActive = !1, this.selectionStartLength = 0;
					}
					clearSelection() {
						this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = !1, this.selectionStartLength = 0;
					}
					get finalSelectionStart() {
						return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
					}
					get finalSelectionEnd() {
						if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
						if (this.selectionStart) {
							if (!this.selectionEnd || this.areSelectionValuesReversed()) {
								const e$2 = this.selectionStart[0] + this.selectionStartLength;
								return e$2 > this._bufferService.cols ? e$2 % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e$2 / this._bufferService.cols) - 1] : [e$2 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e$2 / this._bufferService.cols)] : [e$2, this.selectionStart[1]];
							}
							if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
								const e$2 = this.selectionStart[0] + this.selectionStartLength;
								return e$2 > this._bufferService.cols ? [e$2 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e$2 / this._bufferService.cols)] : [Math.max(e$2, this.selectionEnd[0]), this.selectionEnd[1]];
							}
							return this.selectionEnd;
						}
					}
					areSelectionValuesReversed() {
						const e$2 = this.selectionStart, t$2 = this.selectionEnd;
						return !(!e$2 || !t$2) && (e$2[1] > t$2[1] || e$2[1] === t$2[1] && e$2[0] > t$2[0]);
					}
					handleTrim(e$2) {
						return this.selectionStart && (this.selectionStart[1] -= e$2), this.selectionEnd && (this.selectionEnd[1] -= e$2), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1);
					}
				};
			},
			428: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CharSizeService = void 0;
				const n = i$1(2585), o = i$1(8460), a = i$1(844);
				let h = t$1.CharSizeService = class extends a.Disposable {
					get hasValidSize() {
						return this.width > 0 && this.height > 0;
					}
					constructor(e$2, t$2, i$2) {
						super(), this._optionsService = i$2, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new o.EventEmitter()), this.onCharSizeChange = this._onCharSizeChange.event;
						try {
							this._measureStrategy = this.register(new d(this._optionsService));
						} catch {
							this._measureStrategy = this.register(new l(e$2, t$2, this._optionsService));
						}
						this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], (() => this.measure())));
					}
					measure() {
						const e$2 = this._measureStrategy.measure();
						e$2.width === this.width && e$2.height === this.height || (this.width = e$2.width, this.height = e$2.height, this._onCharSizeChange.fire());
					}
				};
				t$1.CharSizeService = h = s$1([r(2, n.IOptionsService)], h);
				class c$1 extends a.Disposable {
					constructor() {
						super(...arguments), this._result = {
							width: 0,
							height: 0
						};
					}
					_validateAndSet(e$2, t$2) {
						void 0 !== e$2 && e$2 > 0 && void 0 !== t$2 && t$2 > 0 && (this._result.width = e$2, this._result.height = t$2);
					}
				}
				class l extends c$1 {
					constructor(e$2, t$2, i$2) {
						super(), this._document = e$2, this._parentElement = t$2, this._optionsService = i$2, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
					}
					measure() {
						return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
					}
				}
				class d extends c$1 {
					constructor(e$2) {
						super(), this._optionsService = e$2, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
						const t$2 = this._ctx.measureText("W");
						if (!("width" in t$2 && "fontBoundingBoxAscent" in t$2 && "fontBoundingBoxDescent" in t$2)) throw new Error("Required font metrics not supported");
					}
					measure() {
						this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
						const e$2 = this._ctx.measureText("W");
						return this._validateAndSet(e$2.width, e$2.fontBoundingBoxAscent + e$2.fontBoundingBoxDescent), this._result;
					}
				}
			},
			4269: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CharacterJoinerService = t$1.JoinedCellData = void 0;
				const n = i$1(3734), o = i$1(643), a = i$1(511), h = i$1(2585);
				class c$1 extends n.AttributeData {
					constructor(e$2, t$2, i$2) {
						super(), this.content = 0, this.combinedData = "", this.fg = e$2.fg, this.bg = e$2.bg, this.combinedData = t$2, this._width = i$2;
					}
					isCombined() {
						return 2097152;
					}
					getWidth() {
						return this._width;
					}
					getChars() {
						return this.combinedData;
					}
					getCode() {
						return 2097151;
					}
					setFromCharData(e$2) {
						throw new Error("not implemented");
					}
					getAsCharData() {
						return [
							this.fg,
							this.getChars(),
							this.getWidth(),
							this.getCode()
						];
					}
				}
				t$1.JoinedCellData = c$1;
				let l = t$1.CharacterJoinerService = class e$2 {
					constructor(e$3) {
						this._bufferService = e$3, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a.CellData();
					}
					register(e$3) {
						const t$2 = {
							id: this._nextCharacterJoinerId++,
							handler: e$3
						};
						return this._characterJoiners.push(t$2), t$2.id;
					}
					deregister(e$3) {
						for (let t$2 = 0; t$2 < this._characterJoiners.length; t$2++) if (this._characterJoiners[t$2].id === e$3) return this._characterJoiners.splice(t$2, 1), !0;
						return !1;
					}
					getJoinedCharacters(e$3) {
						if (0 === this._characterJoiners.length) return [];
						const t$2 = this._bufferService.buffer.lines.get(e$3);
						if (!t$2 || 0 === t$2.length) return [];
						const i$2 = [], s$2 = t$2.translateToString(!0);
						let r$1 = 0, n$1 = 0, a$1 = 0, h$1 = t$2.getFg(0), c$2 = t$2.getBg(0);
						for (let e$4 = 0; e$4 < t$2.getTrimmedLength(); e$4++) if (t$2.loadCell(e$4, this._workCell), 0 !== this._workCell.getWidth()) {
							if (this._workCell.fg !== h$1 || this._workCell.bg !== c$2) {
								if (e$4 - r$1 > 1) {
									const e$5 = this._getJoinedRanges(s$2, a$1, n$1, t$2, r$1);
									for (let t$3 = 0; t$3 < e$5.length; t$3++) i$2.push(e$5[t$3]);
								}
								r$1 = e$4, a$1 = n$1, h$1 = this._workCell.fg, c$2 = this._workCell.bg;
							}
							n$1 += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
						}
						if (this._bufferService.cols - r$1 > 1) {
							const e$4 = this._getJoinedRanges(s$2, a$1, n$1, t$2, r$1);
							for (let t$3 = 0; t$3 < e$4.length; t$3++) i$2.push(e$4[t$3]);
						}
						return i$2;
					}
					_getJoinedRanges(t$2, i$2, s$2, r$1, n$1) {
						const o$1 = t$2.substring(i$2, s$2);
						let a$1 = [];
						try {
							a$1 = this._characterJoiners[0].handler(o$1);
						} catch (e$3) {
							console.error(e$3);
						}
						for (let t$3 = 1; t$3 < this._characterJoiners.length; t$3++) try {
							const i$3 = this._characterJoiners[t$3].handler(o$1);
							for (let t$4 = 0; t$4 < i$3.length; t$4++) e$2._mergeRanges(a$1, i$3[t$4]);
						} catch (e$3) {
							console.error(e$3);
						}
						return this._stringRangesToCellRanges(a$1, r$1, n$1), a$1;
					}
					_stringRangesToCellRanges(e$3, t$2, i$2) {
						let s$2 = 0, r$1 = !1, n$1 = 0, a$1 = e$3[s$2];
						if (a$1) {
							for (let h$1 = i$2; h$1 < this._bufferService.cols; h$1++) {
								const i$3 = t$2.getWidth(h$1), c$2 = t$2.getString(h$1).length || o.WHITESPACE_CELL_CHAR.length;
								if (0 !== i$3) {
									if (!r$1 && a$1[0] <= n$1 && (a$1[0] = h$1, r$1 = !0), a$1[1] <= n$1) {
										if (a$1[1] = h$1, a$1 = e$3[++s$2], !a$1) break;
										a$1[0] <= n$1 ? (a$1[0] = h$1, r$1 = !0) : r$1 = !1;
									}
									n$1 += c$2;
								}
							}
							a$1 && (a$1[1] = this._bufferService.cols);
						}
					}
					static _mergeRanges(e$3, t$2) {
						let i$2 = !1;
						for (let s$2 = 0; s$2 < e$3.length; s$2++) {
							const r$1 = e$3[s$2];
							if (i$2) {
								if (t$2[1] <= r$1[0]) return e$3[s$2 - 1][1] = t$2[1], e$3;
								if (t$2[1] <= r$1[1]) return e$3[s$2 - 1][1] = Math.max(t$2[1], r$1[1]), e$3.splice(s$2, 1), e$3;
								e$3.splice(s$2, 1), s$2--;
							} else {
								if (t$2[1] <= r$1[0]) return e$3.splice(s$2, 0, t$2), e$3;
								if (t$2[1] <= r$1[1]) return r$1[0] = Math.min(t$2[0], r$1[0]), e$3;
								t$2[0] < r$1[1] && (r$1[0] = Math.min(t$2[0], r$1[0]), i$2 = !0);
							}
						}
						return i$2 ? e$3[e$3.length - 1][1] = t$2[1] : e$3.push(t$2), e$3;
					}
				};
				t$1.CharacterJoinerService = l = s$1([r(0, h.IBufferService)], l);
			},
			5114: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CoreBrowserService = void 0;
				const s$1 = i$1(844), r = i$1(8460), n = i$1(3656);
				class o extends s$1.Disposable {
					constructor(e$2, t$2, i$2) {
						super(), this._textarea = e$2, this._window = t$2, this.mainDocument = i$2, this._isFocused = !1, this._cachedIsFocused = void 0, this._screenDprMonitor = new a(this._window), this._onDprChange = this.register(new r.EventEmitter()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this.register(new r.EventEmitter()), this.onWindowChange = this._onWindowChange.event, this.register(this.onWindowChange(((e$3) => this._screenDprMonitor.setWindow(e$3)))), this.register((0, r.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange)), this._textarea.addEventListener("focus", (() => this._isFocused = !0)), this._textarea.addEventListener("blur", (() => this._isFocused = !1));
					}
					get window() {
						return this._window;
					}
					set window(e$2) {
						this._window !== e$2 && (this._window = e$2, this._onWindowChange.fire(this._window));
					}
					get dpr() {
						return this.window.devicePixelRatio;
					}
					get isFocused() {
						return void 0 === this._cachedIsFocused && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask((() => this._cachedIsFocused = void 0))), this._cachedIsFocused;
					}
				}
				t$1.CoreBrowserService = o;
				class a extends s$1.Disposable {
					constructor(e$2) {
						super(), this._parentWindow = e$2, this._windowResizeListener = this.register(new s$1.MutableDisposable()), this._onDprChange = this.register(new r.EventEmitter()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this.register((0, s$1.toDisposable)((() => this.clearListener())));
					}
					setWindow(e$2) {
						this._parentWindow = e$2, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
					}
					_setWindowResizeListener() {
						this._windowResizeListener.value = (0, n.addDisposableDomListener)(this._parentWindow, "resize", (() => this._setDprAndFireIfDiffers()));
					}
					_setDprAndFireIfDiffers() {
						this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
					}
					_updateDpr() {
						this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
					}
					clearListener() {
						this._resolutionMediaMatchList && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
					}
				}
			},
			779: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.LinkProviderService = void 0;
				const s$1 = i$1(844);
				class r extends s$1.Disposable {
					constructor() {
						super(), this.linkProviders = [], this.register((0, s$1.toDisposable)((() => this.linkProviders.length = 0)));
					}
					registerLinkProvider(e$2) {
						return this.linkProviders.push(e$2), { dispose: () => {
							const t$2 = this.linkProviders.indexOf(e$2);
							-1 !== t$2 && this.linkProviders.splice(t$2, 1);
						} };
					}
				}
				t$1.LinkProviderService = r;
			},
			8934: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.MouseService = void 0;
				const n = i$1(4725), o = i$1(9806);
				let a = t$1.MouseService = class {
					constructor(e$2, t$2) {
						this._renderService = e$2, this._charSizeService = t$2;
					}
					getCoords(e$2, t$2, i$2, s$2, r$1) {
						return (0, o.getCoords)(window, e$2, t$2, i$2, s$2, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r$1);
					}
					getMouseReportCoords(e$2, t$2) {
						const i$2 = (0, o.getCoordsRelativeToElement)(window, e$2, t$2);
						if (this._charSizeService.hasValidSize) return i$2[0] = Math.min(Math.max(i$2[0], 0), this._renderService.dimensions.css.canvas.width - 1), i$2[1] = Math.min(Math.max(i$2[1], 0), this._renderService.dimensions.css.canvas.height - 1), {
							col: Math.floor(i$2[0] / this._renderService.dimensions.css.cell.width),
							row: Math.floor(i$2[1] / this._renderService.dimensions.css.cell.height),
							x: Math.floor(i$2[0]),
							y: Math.floor(i$2[1])
						};
					}
				};
				t$1.MouseService = a = s$1([r(0, n.IRenderService), r(1, n.ICharSizeService)], a);
			},
			3230: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.RenderService = void 0;
				const n = i$1(6193), o = i$1(4725), a = i$1(8460), h = i$1(844), c$1 = i$1(7226), l = i$1(2585);
				let d = t$1.RenderService = class extends h.Disposable {
					get dimensions() {
						return this._renderer.value.dimensions;
					}
					constructor(e$2, t$2, i$2, s$2, r$1, o$1, l$1, d$1) {
						super(), this._rowCount = e$2, this._charSizeService = s$2, this._renderer = this.register(new h.MutableDisposable()), this._pausedResizeTask = new c$1.DebouncedIdleTask(), this._observerDisposable = this.register(new h.MutableDisposable()), this._isPaused = !1, this._needsFullRefresh = !1, this._isNextRenderRedrawOnly = !0, this._needsSelectionRefresh = !1, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = {
							start: void 0,
							end: void 0,
							columnSelectMode: !1
						}, this._onDimensionsChange = this.register(new a.EventEmitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new a.EventEmitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new a.EventEmitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new a.EventEmitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new n.RenderDebouncer(((e$3, t$3) => this._renderRows(e$3, t$3)), l$1), this.register(this._renderDebouncer), this.register(l$1.onDprChange((() => this.handleDevicePixelRatioChange()))), this.register(o$1.onResize((() => this._fullRefresh()))), this.register(o$1.buffers.onBufferActivate((() => this._renderer.value?.clear()))), this.register(i$2.onOptionChange((() => this._handleOptionsChanged()))), this.register(this._charSizeService.onCharSizeChange((() => this.handleCharSizeChanged()))), this.register(r$1.onDecorationRegistered((() => this._fullRefresh()))), this.register(r$1.onDecorationRemoved((() => this._fullRefresh()))), this.register(i$2.onMultipleOptionChange([
							"customGlyphs",
							"drawBoldTextInBrightColors",
							"letterSpacing",
							"lineHeight",
							"fontFamily",
							"fontSize",
							"fontWeight",
							"fontWeightBold",
							"minimumContrastRatio",
							"rescaleOverlappingGlyphs"
						], (() => {
							this.clear(), this.handleResize(o$1.cols, o$1.rows), this._fullRefresh();
						}))), this.register(i$2.onMultipleOptionChange(["cursorBlink", "cursorStyle"], (() => this.refreshRows(o$1.buffer.y, o$1.buffer.y, !0)))), this.register(d$1.onChangeColors((() => this._fullRefresh()))), this._registerIntersectionObserver(l$1.window, t$2), this.register(l$1.onWindowChange(((e$3) => this._registerIntersectionObserver(e$3, t$2))));
					}
					_registerIntersectionObserver(e$2, t$2) {
						if ("IntersectionObserver" in e$2) {
							const i$2 = new e$2.IntersectionObserver(((e$3) => this._handleIntersectionChange(e$3[e$3.length - 1])), { threshold: 0 });
							i$2.observe(t$2), this._observerDisposable.value = (0, h.toDisposable)((() => i$2.disconnect()));
						}
					}
					_handleIntersectionChange(e$2) {
						this._isPaused = void 0 === e$2.isIntersecting ? 0 === e$2.intersectionRatio : !e$2.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = !1);
					}
					refreshRows(e$2, t$2, i$2 = !1) {
						this._isPaused ? this._needsFullRefresh = !0 : (i$2 || (this._isNextRenderRedrawOnly = !1), this._renderDebouncer.refresh(e$2, t$2, this._rowCount));
					}
					_renderRows(e$2, t$2) {
						this._renderer.value && (e$2 = Math.min(e$2, this._rowCount - 1), t$2 = Math.min(t$2, this._rowCount - 1), this._renderer.value.renderRows(e$2, t$2), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = !1), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({
							start: e$2,
							end: t$2
						}), this._onRender.fire({
							start: e$2,
							end: t$2
						}), this._isNextRenderRedrawOnly = !0);
					}
					resize(e$2, t$2) {
						this._rowCount = t$2, this._fireOnCanvasResize();
					}
					_handleOptionsChanged() {
						this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
					}
					_fireOnCanvasResize() {
						this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
					}
					hasRenderer() {
						return !!this._renderer.value;
					}
					setRenderer(e$2) {
						this._renderer.value = e$2, this._renderer.value && (this._renderer.value.onRequestRedraw(((e$3) => this.refreshRows(e$3.start, e$3.end, !0))), this._needsSelectionRefresh = !0, this._fullRefresh());
					}
					addRefreshCallback(e$2) {
						return this._renderDebouncer.addRefreshCallback(e$2);
					}
					_fullRefresh() {
						this._isPaused ? this._needsFullRefresh = !0 : this.refreshRows(0, this._rowCount - 1);
					}
					clearTextureAtlas() {
						this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
					}
					handleDevicePixelRatioChange() {
						this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
					}
					handleResize(e$2, t$2) {
						this._renderer.value && (this._isPaused ? this._pausedResizeTask.set((() => this._renderer.value?.handleResize(e$2, t$2))) : this._renderer.value.handleResize(e$2, t$2), this._fullRefresh());
					}
					handleCharSizeChanged() {
						this._renderer.value?.handleCharSizeChanged();
					}
					handleBlur() {
						this._renderer.value?.handleBlur();
					}
					handleFocus() {
						this._renderer.value?.handleFocus();
					}
					handleSelectionChanged(e$2, t$2, i$2) {
						this._selectionState.start = e$2, this._selectionState.end = t$2, this._selectionState.columnSelectMode = i$2, this._renderer.value?.handleSelectionChanged(e$2, t$2, i$2);
					}
					handleCursorMove() {
						this._renderer.value?.handleCursorMove();
					}
					clear() {
						this._renderer.value?.clear();
					}
				};
				t$1.RenderService = d = s$1([
					r(2, l.IOptionsService),
					r(3, o.ICharSizeService),
					r(4, l.IDecorationService),
					r(5, l.IBufferService),
					r(6, o.ICoreBrowserService),
					r(7, o.IThemeService)
				], d);
			},
			9312: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.SelectionService = void 0;
				const n = i$1(9806), o = i$1(9504), a = i$1(456), h = i$1(4725), c$1 = i$1(8460), l = i$1(844), d = i$1(6114), _ = i$1(4841), u = i$1(511), f = i$1(2585), v = String.fromCharCode(160), p = new RegExp(v, "g");
				let g = t$1.SelectionService = class extends l.Disposable {
					constructor(e$2, t$2, i$2, s$2, r$1, n$1, o$1, h$1, d$1) {
						super(), this._element = e$2, this._screenElement = t$2, this._linkifier = i$2, this._bufferService = s$2, this._coreService = r$1, this._mouseService = n$1, this._optionsService = o$1, this._renderService = h$1, this._coreBrowserService = d$1, this._dragScrollAmount = 0, this._enabled = !0, this._workCell = new u.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = !1, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new c$1.EventEmitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new c$1.EventEmitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new c$1.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new c$1.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e$3) => this._handleMouseMove(e$3), this._mouseUpListener = (e$3) => this._handleMouseUp(e$3), this._coreService.onUserInput((() => {
							this.hasSelection && this.clearSelection();
						})), this._trimListener = this._bufferService.buffer.lines.onTrim(((e$3) => this._handleTrim(e$3))), this.register(this._bufferService.buffers.onBufferActivate(((e$3) => this._handleBufferActivate(e$3)))), this.enable(), this._model = new a.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, l.toDisposable)((() => {
							this._removeMouseDownListeners();
						})));
					}
					reset() {
						this.clearSelection();
					}
					disable() {
						this.clearSelection(), this._enabled = !1;
					}
					enable() {
						this._enabled = !0;
					}
					get selectionStart() {
						return this._model.finalSelectionStart;
					}
					get selectionEnd() {
						return this._model.finalSelectionEnd;
					}
					get hasSelection() {
						const e$2 = this._model.finalSelectionStart, t$2 = this._model.finalSelectionEnd;
						return !(!e$2 || !t$2 || e$2[0] === t$2[0] && e$2[1] === t$2[1]);
					}
					get selectionText() {
						const e$2 = this._model.finalSelectionStart, t$2 = this._model.finalSelectionEnd;
						if (!e$2 || !t$2) return "";
						const i$2 = this._bufferService.buffer, s$2 = [];
						if (3 === this._activeSelectionMode) {
							if (e$2[0] === t$2[0]) return "";
							const r$1 = e$2[0] < t$2[0] ? e$2[0] : t$2[0], n$1 = e$2[0] < t$2[0] ? t$2[0] : e$2[0];
							for (let o$1 = e$2[1]; o$1 <= t$2[1]; o$1++) {
								const e$3 = i$2.translateBufferLineToString(o$1, !0, r$1, n$1);
								s$2.push(e$3);
							}
						} else {
							const r$1 = e$2[1] === t$2[1] ? t$2[0] : void 0;
							s$2.push(i$2.translateBufferLineToString(e$2[1], !0, e$2[0], r$1));
							for (let r$2 = e$2[1] + 1; r$2 <= t$2[1] - 1; r$2++) {
								const e$3 = i$2.lines.get(r$2), t$3 = i$2.translateBufferLineToString(r$2, !0);
								e$3?.isWrapped ? s$2[s$2.length - 1] += t$3 : s$2.push(t$3);
							}
							if (e$2[1] !== t$2[1]) {
								const e$3 = i$2.lines.get(t$2[1]), r$2 = i$2.translateBufferLineToString(t$2[1], !0, 0, t$2[0]);
								e$3 && e$3.isWrapped ? s$2[s$2.length - 1] += r$2 : s$2.push(r$2);
							}
						}
						return s$2.map(((e$3) => e$3.replace(p, " "))).join(d.isWindows ? "\r\n" : "\n");
					}
					clearSelection() {
						this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
					}
					refresh(e$2) {
						this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._refresh()))), d.isLinux && e$2 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
					}
					_refresh() {
						this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({
							start: this._model.finalSelectionStart,
							end: this._model.finalSelectionEnd,
							columnSelectMode: 3 === this._activeSelectionMode
						});
					}
					_isClickInSelection(e$2) {
						const t$2 = this._getMouseBufferCoords(e$2), i$2 = this._model.finalSelectionStart, s$2 = this._model.finalSelectionEnd;
						return !!(i$2 && s$2 && t$2) && this._areCoordsInSelection(t$2, i$2, s$2);
					}
					isCellInSelection(e$2, t$2) {
						const i$2 = this._model.finalSelectionStart, s$2 = this._model.finalSelectionEnd;
						return !(!i$2 || !s$2) && this._areCoordsInSelection([e$2, t$2], i$2, s$2);
					}
					_areCoordsInSelection(e$2, t$2, i$2) {
						return e$2[1] > t$2[1] && e$2[1] < i$2[1] || t$2[1] === i$2[1] && e$2[1] === t$2[1] && e$2[0] >= t$2[0] && e$2[0] < i$2[0] || t$2[1] < i$2[1] && e$2[1] === i$2[1] && e$2[0] < i$2[0] || t$2[1] < i$2[1] && e$2[1] === t$2[1] && e$2[0] >= t$2[0];
					}
					_selectWordAtCursor(e$2, t$2) {
						const i$2 = this._linkifier.currentLink?.link?.range;
						if (i$2) return this._model.selectionStart = [i$2.start.x - 1, i$2.start.y - 1], this._model.selectionStartLength = (0, _.getRangeLength)(i$2, this._bufferService.cols), this._model.selectionEnd = void 0, !0;
						const s$2 = this._getMouseBufferCoords(e$2);
						return !!s$2 && (this._selectWordAt(s$2, t$2), this._model.selectionEnd = void 0, !0);
					}
					selectAll() {
						this._model.isSelectAllActive = !0, this.refresh(), this._onSelectionChange.fire();
					}
					selectLines(e$2, t$2) {
						this._model.clearSelection(), e$2 = Math.max(e$2, 0), t$2 = Math.min(t$2, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e$2], this._model.selectionEnd = [this._bufferService.cols, t$2], this.refresh(), this._onSelectionChange.fire();
					}
					_handleTrim(e$2) {
						this._model.handleTrim(e$2) && this.refresh();
					}
					_getMouseBufferCoords(e$2) {
						const t$2 = this._mouseService.getCoords(e$2, this._screenElement, this._bufferService.cols, this._bufferService.rows, !0);
						if (t$2) return t$2[0]--, t$2[1]--, t$2[1] += this._bufferService.buffer.ydisp, t$2;
					}
					_getMouseEventScrollAmount(e$2) {
						let t$2 = (0, n.getCoordsRelativeToElement)(this._coreBrowserService.window, e$2, this._screenElement)[1];
						const i$2 = this._renderService.dimensions.css.canvas.height;
						return t$2 >= 0 && t$2 <= i$2 ? 0 : (t$2 > i$2 && (t$2 -= i$2), t$2 = Math.min(Math.max(t$2, -50), 50), t$2 /= 50, t$2 / Math.abs(t$2) + Math.round(14 * t$2));
					}
					shouldForceSelection(e$2) {
						return d.isMac ? e$2.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e$2.shiftKey;
					}
					handleMouseDown(e$2) {
						if (this._mouseDownTimeStamp = e$2.timeStamp, (2 !== e$2.button || !this.hasSelection) && 0 === e$2.button) {
							if (!this._enabled) {
								if (!this.shouldForceSelection(e$2)) return;
								e$2.stopPropagation();
							}
							e$2.preventDefault(), this._dragScrollAmount = 0, this._enabled && e$2.shiftKey ? this._handleIncrementalClick(e$2) : 1 === e$2.detail ? this._handleSingleClick(e$2) : 2 === e$2.detail ? this._handleDoubleClick(e$2) : 3 === e$2.detail && this._handleTripleClick(e$2), this._addMouseDownListeners(), this.refresh(!0);
						}
					}
					_addMouseDownListeners() {
						this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval((() => this._dragScroll()), 50);
					}
					_removeMouseDownListeners() {
						this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
					}
					_handleIncrementalClick(e$2) {
						this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e$2));
					}
					_handleSingleClick(e$2) {
						if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = this.shouldColumnSelect(e$2) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e$2), !this._model.selectionStart) return;
						this._model.selectionEnd = void 0;
						const t$2 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
						t$2 && t$2.length !== this._model.selectionStart[0] && 0 === t$2.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
					}
					_handleDoubleClick(e$2) {
						this._selectWordAtCursor(e$2, !0) && (this._activeSelectionMode = 1);
					}
					_handleTripleClick(e$2) {
						const t$2 = this._getMouseBufferCoords(e$2);
						t$2 && (this._activeSelectionMode = 2, this._selectLineAt(t$2[1]));
					}
					shouldColumnSelect(e$2) {
						return e$2.altKey && !(d.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
					}
					_handleMouseMove(e$2) {
						if (e$2.stopImmediatePropagation(), !this._model.selectionStart) return;
						const t$2 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
						if (this._model.selectionEnd = this._getMouseBufferCoords(e$2), !this._model.selectionEnd) return void this.refresh(!0);
						2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e$2), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
						const i$2 = this._bufferService.buffer;
						if (this._model.selectionEnd[1] < i$2.lines.length) {
							const e$3 = i$2.lines.get(this._model.selectionEnd[1]);
							e$3 && 0 === e$3.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
						}
						t$2 && t$2[0] === this._model.selectionEnd[0] && t$2[1] === this._model.selectionEnd[1] || this.refresh(!0);
					}
					_dragScroll() {
						if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
							this._onRequestScrollLines.fire({
								amount: this._dragScrollAmount,
								suppressScrollEvent: !1
							});
							const e$2 = this._bufferService.buffer;
							this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e$2.ydisp + this._bufferService.rows, e$2.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e$2.ydisp), this.refresh();
						}
					}
					_handleMouseUp(e$2) {
						const t$2 = e$2.timeStamp - this._mouseDownTimeStamp;
						if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t$2 < 500 && e$2.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
							if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
								const t$3 = this._mouseService.getCoords(e$2, this._element, this._bufferService.cols, this._bufferService.rows, !1);
								if (t$3 && void 0 !== t$3[0] && void 0 !== t$3[1]) {
									const e$3 = (0, o.moveToCellSequence)(t$3[0] - 1, t$3[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
									this._coreService.triggerDataEvent(e$3, !0);
								}
							}
						} else this._fireEventIfSelectionChanged();
					}
					_fireEventIfSelectionChanged() {
						const e$2 = this._model.finalSelectionStart, t$2 = this._model.finalSelectionEnd, i$2 = !(!e$2 || !t$2 || e$2[0] === t$2[0] && e$2[1] === t$2[1]);
						i$2 ? e$2 && t$2 && (this._oldSelectionStart && this._oldSelectionEnd && e$2[0] === this._oldSelectionStart[0] && e$2[1] === this._oldSelectionStart[1] && t$2[0] === this._oldSelectionEnd[0] && t$2[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e$2, t$2, i$2)) : this._oldHasSelection && this._fireOnSelectionChange(e$2, t$2, i$2);
					}
					_fireOnSelectionChange(e$2, t$2, i$2) {
						this._oldSelectionStart = e$2, this._oldSelectionEnd = t$2, this._oldHasSelection = i$2, this._onSelectionChange.fire();
					}
					_handleBufferActivate(e$2) {
						this.clearSelection(), this._trimListener.dispose(), this._trimListener = e$2.activeBuffer.lines.onTrim(((e$3) => this._handleTrim(e$3)));
					}
					_convertViewportColToCharacterIndex(e$2, t$2) {
						let i$2 = t$2;
						for (let s$2 = 0; t$2 >= s$2; s$2++) {
							const r$1 = e$2.loadCell(s$2, this._workCell).getChars().length;
							0 === this._workCell.getWidth() ? i$2-- : r$1 > 1 && t$2 !== s$2 && (i$2 += r$1 - 1);
						}
						return i$2;
					}
					setSelection(e$2, t$2, i$2) {
						this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e$2, t$2], this._model.selectionStartLength = i$2, this.refresh(), this._fireEventIfSelectionChanged();
					}
					rightClickSelect(e$2) {
						this._isClickInSelection(e$2) || (this._selectWordAtCursor(e$2, !1) && this.refresh(!0), this._fireEventIfSelectionChanged());
					}
					_getWordAt(e$2, t$2, i$2 = !0, s$2 = !0) {
						if (e$2[0] >= this._bufferService.cols) return;
						const r$1 = this._bufferService.buffer, n$1 = r$1.lines.get(e$2[1]);
						if (!n$1) return;
						const o$1 = r$1.translateBufferLineToString(e$2[1], !1);
						let a$1 = this._convertViewportColToCharacterIndex(n$1, e$2[0]), h$1 = a$1;
						const c$2 = e$2[0] - a$1;
						let l$1 = 0, d$1 = 0, _$1 = 0, u$1 = 0;
						if (" " === o$1.charAt(a$1)) {
							for (; a$1 > 0 && " " === o$1.charAt(a$1 - 1);) a$1--;
							for (; h$1 < o$1.length && " " === o$1.charAt(h$1 + 1);) h$1++;
						} else {
							let t$3 = e$2[0], i$3 = e$2[0];
							0 === n$1.getWidth(t$3) && (l$1++, t$3--), 2 === n$1.getWidth(i$3) && (d$1++, i$3++);
							const s$3 = n$1.getString(i$3).length;
							for (s$3 > 1 && (u$1 += s$3 - 1, h$1 += s$3 - 1); t$3 > 0 && a$1 > 0 && !this._isCharWordSeparator(n$1.loadCell(t$3 - 1, this._workCell));) {
								n$1.loadCell(t$3 - 1, this._workCell);
								const e$3 = this._workCell.getChars().length;
								0 === this._workCell.getWidth() ? (l$1++, t$3--) : e$3 > 1 && (_$1 += e$3 - 1, a$1 -= e$3 - 1), a$1--, t$3--;
							}
							for (; i$3 < n$1.length && h$1 + 1 < o$1.length && !this._isCharWordSeparator(n$1.loadCell(i$3 + 1, this._workCell));) {
								n$1.loadCell(i$3 + 1, this._workCell);
								const e$3 = this._workCell.getChars().length;
								2 === this._workCell.getWidth() ? (d$1++, i$3++) : e$3 > 1 && (u$1 += e$3 - 1, h$1 += e$3 - 1), h$1++, i$3++;
							}
						}
						h$1++;
						let f$1 = a$1 + c$2 - l$1 + _$1, v$1 = Math.min(this._bufferService.cols, h$1 - a$1 + l$1 + d$1 - _$1 - u$1);
						if (t$2 || "" !== o$1.slice(a$1, h$1).trim()) {
							if (i$2 && 0 === f$1 && 32 !== n$1.getCodePoint(0)) {
								const t$3 = r$1.lines.get(e$2[1] - 1);
								if (t$3 && n$1.isWrapped && 32 !== t$3.getCodePoint(this._bufferService.cols - 1)) {
									const t$4 = this._getWordAt([this._bufferService.cols - 1, e$2[1] - 1], !1, !0, !1);
									if (t$4) {
										const e$3 = this._bufferService.cols - t$4.start;
										f$1 -= e$3, v$1 += e$3;
									}
								}
							}
							if (s$2 && f$1 + v$1 === this._bufferService.cols && 32 !== n$1.getCodePoint(this._bufferService.cols - 1)) {
								const t$3 = r$1.lines.get(e$2[1] + 1);
								if (t$3?.isWrapped && 32 !== t$3.getCodePoint(0)) {
									const t$4 = this._getWordAt([0, e$2[1] + 1], !1, !1, !0);
									t$4 && (v$1 += t$4.length);
								}
							}
							return {
								start: f$1,
								length: v$1
							};
						}
					}
					_selectWordAt(e$2, t$2) {
						const i$2 = this._getWordAt(e$2, t$2);
						if (i$2) {
							for (; i$2.start < 0;) i$2.start += this._bufferService.cols, e$2[1]--;
							this._model.selectionStart = [i$2.start, e$2[1]], this._model.selectionStartLength = i$2.length;
						}
					}
					_selectToWordAt(e$2) {
						const t$2 = this._getWordAt(e$2, !0);
						if (t$2) {
							let i$2 = e$2[1];
							for (; t$2.start < 0;) t$2.start += this._bufferService.cols, i$2--;
							if (!this._model.areSelectionValuesReversed()) for (; t$2.start + t$2.length > this._bufferService.cols;) t$2.length -= this._bufferService.cols, i$2++;
							this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t$2.start : t$2.start + t$2.length, i$2];
						}
					}
					_isCharWordSeparator(e$2) {
						return 0 !== e$2.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e$2.getChars()) >= 0;
					}
					_selectLineAt(e$2) {
						const t$2 = this._bufferService.buffer.getWrappedRangeForLine(e$2), i$2 = {
							start: {
								x: 0,
								y: t$2.first
							},
							end: {
								x: this._bufferService.cols - 1,
								y: t$2.last
							}
						};
						this._model.selectionStart = [0, t$2.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, _.getRangeLength)(i$2, this._bufferService.cols);
					}
				};
				t$1.SelectionService = g = s$1([
					r(3, f.IBufferService),
					r(4, f.ICoreService),
					r(5, h.IMouseService),
					r(6, f.IOptionsService),
					r(7, h.IRenderService),
					r(8, h.ICoreBrowserService)
				], g);
			},
			4725: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ILinkProviderService = t$1.IThemeService = t$1.ICharacterJoinerService = t$1.ISelectionService = t$1.IRenderService = t$1.IMouseService = t$1.ICoreBrowserService = t$1.ICharSizeService = void 0;
				const s$1 = i$1(8343);
				t$1.ICharSizeService = (0, s$1.createDecorator)("CharSizeService"), t$1.ICoreBrowserService = (0, s$1.createDecorator)("CoreBrowserService"), t$1.IMouseService = (0, s$1.createDecorator)("MouseService"), t$1.IRenderService = (0, s$1.createDecorator)("RenderService"), t$1.ISelectionService = (0, s$1.createDecorator)("SelectionService"), t$1.ICharacterJoinerService = (0, s$1.createDecorator)("CharacterJoinerService"), t$1.IThemeService = (0, s$1.createDecorator)("ThemeService"), t$1.ILinkProviderService = (0, s$1.createDecorator)("LinkProviderService");
			},
			6731: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ThemeService = t$1.DEFAULT_ANSI_COLORS = void 0;
				const n = i$1(7239), o = i$1(8055), a = i$1(8460), h = i$1(844), c$1 = i$1(2585), l = o.css.toColor("#ffffff"), d = o.css.toColor("#000000"), _ = o.css.toColor("#ffffff"), u = o.css.toColor("#000000"), f = {
					css: "rgba(255, 255, 255, 0.3)",
					rgba: 4294967117
				};
				t$1.DEFAULT_ANSI_COLORS = Object.freeze((() => {
					const e$2 = [
						o.css.toColor("#2e3436"),
						o.css.toColor("#cc0000"),
						o.css.toColor("#4e9a06"),
						o.css.toColor("#c4a000"),
						o.css.toColor("#3465a4"),
						o.css.toColor("#75507b"),
						o.css.toColor("#06989a"),
						o.css.toColor("#d3d7cf"),
						o.css.toColor("#555753"),
						o.css.toColor("#ef2929"),
						o.css.toColor("#8ae234"),
						o.css.toColor("#fce94f"),
						o.css.toColor("#729fcf"),
						o.css.toColor("#ad7fa8"),
						o.css.toColor("#34e2e2"),
						o.css.toColor("#eeeeec")
					], t$2 = [
						0,
						95,
						135,
						175,
						215,
						255
					];
					for (let i$2 = 0; i$2 < 216; i$2++) {
						const s$2 = t$2[i$2 / 36 % 6 | 0], r$1 = t$2[i$2 / 6 % 6 | 0], n$1 = t$2[i$2 % 6];
						e$2.push({
							css: o.channels.toCss(s$2, r$1, n$1),
							rgba: o.channels.toRgba(s$2, r$1, n$1)
						});
					}
					for (let t$3 = 0; t$3 < 24; t$3++) {
						const i$2 = 8 + 10 * t$3;
						e$2.push({
							css: o.channels.toCss(i$2, i$2, i$2),
							rgba: o.channels.toRgba(i$2, i$2, i$2)
						});
					}
					return e$2;
				})());
				let v = t$1.ThemeService = class extends h.Disposable {
					get colors() {
						return this._colors;
					}
					constructor(e$2) {
						super(), this._optionsService = e$2, this._contrastCache = new n.ColorContrastCache(), this._halfContrastCache = new n.ColorContrastCache(), this._onChangeColors = this.register(new a.EventEmitter()), this.onChangeColors = this._onChangeColors.event, this._colors = {
							foreground: l,
							background: d,
							cursor: _,
							cursorAccent: u,
							selectionForeground: void 0,
							selectionBackgroundTransparent: f,
							selectionBackgroundOpaque: o.color.blend(d, f),
							selectionInactiveBackgroundTransparent: f,
							selectionInactiveBackgroundOpaque: o.color.blend(d, f),
							ansi: t$1.DEFAULT_ANSI_COLORS.slice(),
							contrastCache: this._contrastCache,
							halfContrastCache: this._halfContrastCache
						}, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", (() => this._contrastCache.clear()))), this.register(this._optionsService.onSpecificOptionChange("theme", (() => this._setTheme(this._optionsService.rawOptions.theme))));
					}
					_setTheme(e$2 = {}) {
						const i$2 = this._colors;
						if (i$2.foreground = p(e$2.foreground, l), i$2.background = p(e$2.background, d), i$2.cursor = p(e$2.cursor, _), i$2.cursorAccent = p(e$2.cursorAccent, u), i$2.selectionBackgroundTransparent = p(e$2.selectionBackground, f), i$2.selectionBackgroundOpaque = o.color.blend(i$2.background, i$2.selectionBackgroundTransparent), i$2.selectionInactiveBackgroundTransparent = p(e$2.selectionInactiveBackground, i$2.selectionBackgroundTransparent), i$2.selectionInactiveBackgroundOpaque = o.color.blend(i$2.background, i$2.selectionInactiveBackgroundTransparent), i$2.selectionForeground = e$2.selectionForeground ? p(e$2.selectionForeground, o.NULL_COLOR) : void 0, i$2.selectionForeground === o.NULL_COLOR && (i$2.selectionForeground = void 0), o.color.isOpaque(i$2.selectionBackgroundTransparent)) i$2.selectionBackgroundTransparent = o.color.opacity(i$2.selectionBackgroundTransparent, .3);
						if (o.color.isOpaque(i$2.selectionInactiveBackgroundTransparent)) i$2.selectionInactiveBackgroundTransparent = o.color.opacity(i$2.selectionInactiveBackgroundTransparent, .3);
						if (i$2.ansi = t$1.DEFAULT_ANSI_COLORS.slice(), i$2.ansi[0] = p(e$2.black, t$1.DEFAULT_ANSI_COLORS[0]), i$2.ansi[1] = p(e$2.red, t$1.DEFAULT_ANSI_COLORS[1]), i$2.ansi[2] = p(e$2.green, t$1.DEFAULT_ANSI_COLORS[2]), i$2.ansi[3] = p(e$2.yellow, t$1.DEFAULT_ANSI_COLORS[3]), i$2.ansi[4] = p(e$2.blue, t$1.DEFAULT_ANSI_COLORS[4]), i$2.ansi[5] = p(e$2.magenta, t$1.DEFAULT_ANSI_COLORS[5]), i$2.ansi[6] = p(e$2.cyan, t$1.DEFAULT_ANSI_COLORS[6]), i$2.ansi[7] = p(e$2.white, t$1.DEFAULT_ANSI_COLORS[7]), i$2.ansi[8] = p(e$2.brightBlack, t$1.DEFAULT_ANSI_COLORS[8]), i$2.ansi[9] = p(e$2.brightRed, t$1.DEFAULT_ANSI_COLORS[9]), i$2.ansi[10] = p(e$2.brightGreen, t$1.DEFAULT_ANSI_COLORS[10]), i$2.ansi[11] = p(e$2.brightYellow, t$1.DEFAULT_ANSI_COLORS[11]), i$2.ansi[12] = p(e$2.brightBlue, t$1.DEFAULT_ANSI_COLORS[12]), i$2.ansi[13] = p(e$2.brightMagenta, t$1.DEFAULT_ANSI_COLORS[13]), i$2.ansi[14] = p(e$2.brightCyan, t$1.DEFAULT_ANSI_COLORS[14]), i$2.ansi[15] = p(e$2.brightWhite, t$1.DEFAULT_ANSI_COLORS[15]), e$2.extendedAnsi) {
							const s$2 = Math.min(i$2.ansi.length - 16, e$2.extendedAnsi.length);
							for (let r$1 = 0; r$1 < s$2; r$1++) i$2.ansi[r$1 + 16] = p(e$2.extendedAnsi[r$1], t$1.DEFAULT_ANSI_COLORS[r$1 + 16]);
						}
						this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
					}
					restoreColor(e$2) {
						this._restoreColor(e$2), this._onChangeColors.fire(this.colors);
					}
					_restoreColor(e$2) {
						if (void 0 !== e$2) switch (e$2) {
							case 256:
								this._colors.foreground = this._restoreColors.foreground;
								break;
							case 257:
								this._colors.background = this._restoreColors.background;
								break;
							case 258:
								this._colors.cursor = this._restoreColors.cursor;
								break;
							default: this._colors.ansi[e$2] = this._restoreColors.ansi[e$2];
						}
						else for (let e$3 = 0; e$3 < this._restoreColors.ansi.length; ++e$3) this._colors.ansi[e$3] = this._restoreColors.ansi[e$3];
					}
					modifyColors(e$2) {
						e$2(this._colors), this._onChangeColors.fire(this.colors);
					}
					_updateRestoreColors() {
						this._restoreColors = {
							foreground: this._colors.foreground,
							background: this._colors.background,
							cursor: this._colors.cursor,
							ansi: this._colors.ansi.slice()
						};
					}
				};
				function p(e$2, t$2) {
					if (void 0 !== e$2) try {
						return o.css.toColor(e$2);
					} catch {}
					return t$2;
				}
				t$1.ThemeService = v = s$1([r(0, c$1.IOptionsService)], v);
			},
			6349: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CircularList = void 0;
				const s$1 = i$1(8460), r = i$1(844);
				class n extends r.Disposable {
					constructor(e$2) {
						super(), this._maxLength = e$2, this.onDeleteEmitter = this.register(new s$1.EventEmitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new s$1.EventEmitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new s$1.EventEmitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
					}
					get maxLength() {
						return this._maxLength;
					}
					set maxLength(e$2) {
						if (this._maxLength === e$2) return;
						const t$2 = new Array(e$2);
						for (let i$2 = 0; i$2 < Math.min(e$2, this.length); i$2++) t$2[i$2] = this._array[this._getCyclicIndex(i$2)];
						this._array = t$2, this._maxLength = e$2, this._startIndex = 0;
					}
					get length() {
						return this._length;
					}
					set length(e$2) {
						if (e$2 > this._length) for (let t$2 = this._length; t$2 < e$2; t$2++) this._array[t$2] = void 0;
						this._length = e$2;
					}
					get(e$2) {
						return this._array[this._getCyclicIndex(e$2)];
					}
					set(e$2, t$2) {
						this._array[this._getCyclicIndex(e$2)] = t$2;
					}
					push(e$2) {
						this._array[this._getCyclicIndex(this._length)] = e$2, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
					}
					recycle() {
						if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
						return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
					}
					get isFull() {
						return this._length === this._maxLength;
					}
					pop() {
						return this._array[this._getCyclicIndex(this._length-- - 1)];
					}
					splice(e$2, t$2, ...i$2) {
						if (t$2) {
							for (let i$3 = e$2; i$3 < this._length - t$2; i$3++) this._array[this._getCyclicIndex(i$3)] = this._array[this._getCyclicIndex(i$3 + t$2)];
							this._length -= t$2, this.onDeleteEmitter.fire({
								index: e$2,
								amount: t$2
							});
						}
						for (let t$3 = this._length - 1; t$3 >= e$2; t$3--) this._array[this._getCyclicIndex(t$3 + i$2.length)] = this._array[this._getCyclicIndex(t$3)];
						for (let t$3 = 0; t$3 < i$2.length; t$3++) this._array[this._getCyclicIndex(e$2 + t$3)] = i$2[t$3];
						if (i$2.length && this.onInsertEmitter.fire({
							index: e$2,
							amount: i$2.length
						}), this._length + i$2.length > this._maxLength) {
							const e$3 = this._length + i$2.length - this._maxLength;
							this._startIndex += e$3, this._length = this._maxLength, this.onTrimEmitter.fire(e$3);
						} else this._length += i$2.length;
					}
					trimStart(e$2) {
						e$2 > this._length && (e$2 = this._length), this._startIndex += e$2, this._length -= e$2, this.onTrimEmitter.fire(e$2);
					}
					shiftElements(e$2, t$2, i$2) {
						if (!(t$2 <= 0)) {
							if (e$2 < 0 || e$2 >= this._length) throw new Error("start argument out of range");
							if (e$2 + i$2 < 0) throw new Error("Cannot shift elements in list beyond index 0");
							if (i$2 > 0) {
								for (let s$3 = t$2 - 1; s$3 >= 0; s$3--) this.set(e$2 + s$3 + i$2, this.get(e$2 + s$3));
								const s$2 = e$2 + t$2 + i$2 - this._length;
								if (s$2 > 0) for (this._length += s$2; this._length > this._maxLength;) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
							} else for (let s$2 = 0; s$2 < t$2; s$2++) this.set(e$2 + s$2 + i$2, this.get(e$2 + s$2));
						}
					}
					_getCyclicIndex(e$2) {
						return (this._startIndex + e$2) % this._maxLength;
					}
				}
				t$1.CircularList = n;
			},
			1439: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.clone = void 0, t$1.clone = function e$2(t$2, i$1 = 5) {
					if ("object" != typeof t$2) return t$2;
					const s$1 = Array.isArray(t$2) ? [] : {};
					for (const r in t$2) s$1[r] = i$1 <= 1 ? t$2[r] : t$2[r] && e$2(t$2[r], i$1 - 1);
					return s$1;
				};
			},
			8055: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.contrastRatio = t$1.toPaddedHex = t$1.rgba = t$1.rgb = t$1.css = t$1.color = t$1.channels = t$1.NULL_COLOR = void 0;
				let i$1 = 0, s$1 = 0, r = 0, n = 0;
				var o, a, h, c$1, l;
				function d(e$2) {
					const t$2 = e$2.toString(16);
					return t$2.length < 2 ? "0" + t$2 : t$2;
				}
				function _(e$2, t$2) {
					return e$2 < t$2 ? (t$2 + .05) / (e$2 + .05) : (e$2 + .05) / (t$2 + .05);
				}
				t$1.NULL_COLOR = {
					css: "#00000000",
					rgba: 0
				}, function(e$2) {
					e$2.toCss = function(e$3, t$2, i$2, s$2) {
						return void 0 !== s$2 ? `#${d(e$3)}${d(t$2)}${d(i$2)}${d(s$2)}` : `#${d(e$3)}${d(t$2)}${d(i$2)}`;
					}, e$2.toRgba = function(e$3, t$2, i$2, s$2 = 255) {
						return (e$3 << 24 | t$2 << 16 | i$2 << 8 | s$2) >>> 0;
					}, e$2.toColor = function(t$2, i$2, s$2, r$1) {
						return {
							css: e$2.toCss(t$2, i$2, s$2, r$1),
							rgba: e$2.toRgba(t$2, i$2, s$2, r$1)
						};
					};
				}(o || (t$1.channels = o = {})), function(e$2) {
					function t$2(e$3, t$3) {
						return n = Math.round(255 * t$3), [i$1, s$1, r] = l.toChannels(e$3.rgba), {
							css: o.toCss(i$1, s$1, r, n),
							rgba: o.toRgba(i$1, s$1, r, n)
						};
					}
					e$2.blend = function(e$3, t$3) {
						if (n = (255 & t$3.rgba) / 255, 1 === n) return {
							css: t$3.css,
							rgba: t$3.rgba
						};
						const a$1 = t$3.rgba >> 24 & 255, h$1 = t$3.rgba >> 16 & 255, c$2 = t$3.rgba >> 8 & 255, l$1 = e$3.rgba >> 24 & 255, d$1 = e$3.rgba >> 16 & 255, _$1 = e$3.rgba >> 8 & 255;
						return i$1 = l$1 + Math.round((a$1 - l$1) * n), s$1 = d$1 + Math.round((h$1 - d$1) * n), r = _$1 + Math.round((c$2 - _$1) * n), {
							css: o.toCss(i$1, s$1, r),
							rgba: o.toRgba(i$1, s$1, r)
						};
					}, e$2.isOpaque = function(e$3) {
						return 255 == (255 & e$3.rgba);
					}, e$2.ensureContrastRatio = function(e$3, t$3, i$2) {
						const s$2 = l.ensureContrastRatio(e$3.rgba, t$3.rgba, i$2);
						if (s$2) return o.toColor(s$2 >> 24 & 255, s$2 >> 16 & 255, s$2 >> 8 & 255);
					}, e$2.opaque = function(e$3) {
						const t$3 = (255 | e$3.rgba) >>> 0;
						return [i$1, s$1, r] = l.toChannels(t$3), {
							css: o.toCss(i$1, s$1, r),
							rgba: t$3
						};
					}, e$2.opacity = t$2, e$2.multiplyOpacity = function(e$3, i$2) {
						return n = 255 & e$3.rgba, t$2(e$3, n * i$2 / 255);
					}, e$2.toColorRGB = function(e$3) {
						return [
							e$3.rgba >> 24 & 255,
							e$3.rgba >> 16 & 255,
							e$3.rgba >> 8 & 255
						];
					};
				}(a || (t$1.color = a = {})), function(e$2) {
					let t$2, a$1;
					try {
						const e$3 = document.createElement("canvas");
						e$3.width = 1, e$3.height = 1;
						const i$2 = e$3.getContext("2d", { willReadFrequently: !0 });
						i$2 && (t$2 = i$2, t$2.globalCompositeOperation = "copy", a$1 = t$2.createLinearGradient(0, 0, 1, 1));
					} catch {}
					e$2.toColor = function(e$3) {
						if (e$3.match(/#[\da-f]{3,8}/i)) switch (e$3.length) {
							case 4: return i$1 = parseInt(e$3.slice(1, 2).repeat(2), 16), s$1 = parseInt(e$3.slice(2, 3).repeat(2), 16), r = parseInt(e$3.slice(3, 4).repeat(2), 16), o.toColor(i$1, s$1, r);
							case 5: return i$1 = parseInt(e$3.slice(1, 2).repeat(2), 16), s$1 = parseInt(e$3.slice(2, 3).repeat(2), 16), r = parseInt(e$3.slice(3, 4).repeat(2), 16), n = parseInt(e$3.slice(4, 5).repeat(2), 16), o.toColor(i$1, s$1, r, n);
							case 7: return {
								css: e$3,
								rgba: (parseInt(e$3.slice(1), 16) << 8 | 255) >>> 0
							};
							case 9: return {
								css: e$3,
								rgba: parseInt(e$3.slice(1), 16) >>> 0
							};
						}
						const h$1 = e$3.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
						if (h$1) return i$1 = parseInt(h$1[1]), s$1 = parseInt(h$1[2]), r = parseInt(h$1[3]), n = Math.round(255 * (void 0 === h$1[5] ? 1 : parseFloat(h$1[5]))), o.toColor(i$1, s$1, r, n);
						if (!t$2 || !a$1) throw new Error("css.toColor: Unsupported css format");
						if (t$2.fillStyle = a$1, t$2.fillStyle = e$3, "string" != typeof t$2.fillStyle) throw new Error("css.toColor: Unsupported css format");
						if (t$2.fillRect(0, 0, 1, 1), [i$1, s$1, r, n] = t$2.getImageData(0, 0, 1, 1).data, 255 !== n) throw new Error("css.toColor: Unsupported css format");
						return {
							rgba: o.toRgba(i$1, s$1, r, n),
							css: e$3
						};
					};
				}(h || (t$1.css = h = {})), function(e$2) {
					function t$2(e$3, t$3, i$2) {
						const s$2 = e$3 / 255, r$1 = t$3 / 255, n$1 = i$2 / 255;
						return .2126 * (s$2 <= .03928 ? s$2 / 12.92 : Math.pow((s$2 + .055) / 1.055, 2.4)) + .7152 * (r$1 <= .03928 ? r$1 / 12.92 : Math.pow((r$1 + .055) / 1.055, 2.4)) + .0722 * (n$1 <= .03928 ? n$1 / 12.92 : Math.pow((n$1 + .055) / 1.055, 2.4));
					}
					e$2.relativeLuminance = function(e$3) {
						return t$2(e$3 >> 16 & 255, e$3 >> 8 & 255, 255 & e$3);
					}, e$2.relativeLuminance2 = t$2;
				}(c$1 || (t$1.rgb = c$1 = {})), function(e$2) {
					function t$2(e$3, t$3, i$2) {
						const s$2 = e$3 >> 24 & 255, r$1 = e$3 >> 16 & 255, n$1 = e$3 >> 8 & 255;
						let o$1 = t$3 >> 24 & 255, a$2 = t$3 >> 16 & 255, h$1 = t$3 >> 8 & 255, l$1 = _(c$1.relativeLuminance2(o$1, a$2, h$1), c$1.relativeLuminance2(s$2, r$1, n$1));
						for (; l$1 < i$2 && (o$1 > 0 || a$2 > 0 || h$1 > 0);) o$1 -= Math.max(0, Math.ceil(.1 * o$1)), a$2 -= Math.max(0, Math.ceil(.1 * a$2)), h$1 -= Math.max(0, Math.ceil(.1 * h$1)), l$1 = _(c$1.relativeLuminance2(o$1, a$2, h$1), c$1.relativeLuminance2(s$2, r$1, n$1));
						return (o$1 << 24 | a$2 << 16 | h$1 << 8 | 255) >>> 0;
					}
					function a$1(e$3, t$3, i$2) {
						const s$2 = e$3 >> 24 & 255, r$1 = e$3 >> 16 & 255, n$1 = e$3 >> 8 & 255;
						let o$1 = t$3 >> 24 & 255, a$2 = t$3 >> 16 & 255, h$1 = t$3 >> 8 & 255, l$1 = _(c$1.relativeLuminance2(o$1, a$2, h$1), c$1.relativeLuminance2(s$2, r$1, n$1));
						for (; l$1 < i$2 && (o$1 < 255 || a$2 < 255 || h$1 < 255);) o$1 = Math.min(255, o$1 + Math.ceil(.1 * (255 - o$1))), a$2 = Math.min(255, a$2 + Math.ceil(.1 * (255 - a$2))), h$1 = Math.min(255, h$1 + Math.ceil(.1 * (255 - h$1))), l$1 = _(c$1.relativeLuminance2(o$1, a$2, h$1), c$1.relativeLuminance2(s$2, r$1, n$1));
						return (o$1 << 24 | a$2 << 16 | h$1 << 8 | 255) >>> 0;
					}
					e$2.blend = function(e$3, t$3) {
						if (n = (255 & t$3) / 255, 1 === n) return t$3;
						const a$2 = t$3 >> 24 & 255, h$1 = t$3 >> 16 & 255, c$2 = t$3 >> 8 & 255, l$1 = e$3 >> 24 & 255, d$1 = e$3 >> 16 & 255, _$1 = e$3 >> 8 & 255;
						return i$1 = l$1 + Math.round((a$2 - l$1) * n), s$1 = d$1 + Math.round((h$1 - d$1) * n), r = _$1 + Math.round((c$2 - _$1) * n), o.toRgba(i$1, s$1, r);
					}, e$2.ensureContrastRatio = function(e$3, i$2, s$2) {
						const r$1 = c$1.relativeLuminance(e$3 >> 8), n$1 = c$1.relativeLuminance(i$2 >> 8);
						if (_(r$1, n$1) < s$2) {
							if (n$1 < r$1) {
								const n$2 = t$2(e$3, i$2, s$2), o$2 = _(r$1, c$1.relativeLuminance(n$2 >> 8));
								if (o$2 < s$2) {
									const t$3 = a$1(e$3, i$2, s$2);
									return o$2 > _(r$1, c$1.relativeLuminance(t$3 >> 8)) ? n$2 : t$3;
								}
								return n$2;
							}
							const o$1 = a$1(e$3, i$2, s$2), h$1 = _(r$1, c$1.relativeLuminance(o$1 >> 8));
							if (h$1 < s$2) {
								const n$2 = t$2(e$3, i$2, s$2);
								return h$1 > _(r$1, c$1.relativeLuminance(n$2 >> 8)) ? o$1 : n$2;
							}
							return o$1;
						}
					}, e$2.reduceLuminance = t$2, e$2.increaseLuminance = a$1, e$2.toChannels = function(e$3) {
						return [
							e$3 >> 24 & 255,
							e$3 >> 16 & 255,
							e$3 >> 8 & 255,
							255 & e$3
						];
					};
				}(l || (t$1.rgba = l = {})), t$1.toPaddedHex = d, t$1.contrastRatio = _;
			},
			8969: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CoreTerminal = void 0;
				const s$1 = i$1(844), r = i$1(2585), n = i$1(4348), o = i$1(7866), a = i$1(744), h = i$1(7302), c$1 = i$1(6975), l = i$1(8460), d = i$1(1753), _ = i$1(1480), u = i$1(7994), f = i$1(9282), v = i$1(5435), p = i$1(5981), g = i$1(2660);
				let m = !1;
				class S extends s$1.Disposable {
					get onScroll() {
						return this._onScrollApi || (this._onScrollApi = this.register(new l.EventEmitter()), this._onScroll.event(((e$2) => {
							this._onScrollApi?.fire(e$2.position);
						}))), this._onScrollApi.event;
					}
					get cols() {
						return this._bufferService.cols;
					}
					get rows() {
						return this._bufferService.rows;
					}
					get buffers() {
						return this._bufferService.buffers;
					}
					get options() {
						return this.optionsService.options;
					}
					set options(e$2) {
						for (const t$2 in e$2) this.optionsService.options[t$2] = e$2[t$2];
					}
					constructor(e$2) {
						super(), this._windowsWrappingHeuristics = this.register(new s$1.MutableDisposable()), this._onBinary = this.register(new l.EventEmitter()), this.onBinary = this._onBinary.event, this._onData = this.register(new l.EventEmitter()), this.onData = this._onData.event, this._onLineFeed = this.register(new l.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new l.EventEmitter()), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new l.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new l.EventEmitter()), this._instantiationService = new n.InstantiationService(), this.optionsService = this.register(new h.OptionsService(e$2)), this._instantiationService.setService(r.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a.BufferService)), this._instantiationService.setService(r.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(o.LogService)), this._instantiationService.setService(r.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c$1.CoreService)), this._instantiationService.setService(r.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(d.CoreMouseService)), this._instantiationService.setService(r.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(_.UnicodeService)), this._instantiationService.setService(r.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(u.CharsetService), this._instantiationService.setService(r.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(g.OscLinkService), this._instantiationService.setService(r.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new v.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, l.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom((() => this.scrollToBottom()))), this.register(this.coreService.onUserInput((() => this._writeBuffer.handleUserInput()))), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], (() => this._handleWindowsPtyOptionChange()))), this.register(this._bufferService.onScroll(((e$3) => {
							this._onScroll.fire({
								position: this._bufferService.buffer.ydisp,
								source: 0
							}), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
						}))), this.register(this._inputHandler.onScroll(((e$3) => {
							this._onScroll.fire({
								position: this._bufferService.buffer.ydisp,
								source: 0
							}), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
						}))), this._writeBuffer = this.register(new p.WriteBuffer(((e$3, t$2) => this._inputHandler.parse(e$3, t$2)))), this.register((0, l.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
					}
					write(e$2, t$2) {
						this._writeBuffer.write(e$2, t$2);
					}
					writeSync(e$2, t$2) {
						this._logService.logLevel <= r.LogLevelEnum.WARN && !m && (this._logService.warn("writeSync is unreliable and will be removed soon."), m = !0), this._writeBuffer.writeSync(e$2, t$2);
					}
					input(e$2, t$2 = !0) {
						this.coreService.triggerDataEvent(e$2, t$2);
					}
					resize(e$2, t$2) {
						isNaN(e$2) || isNaN(t$2) || (e$2 = Math.max(e$2, a.MINIMUM_COLS), t$2 = Math.max(t$2, a.MINIMUM_ROWS), this._bufferService.resize(e$2, t$2));
					}
					scroll(e$2, t$2 = !1) {
						this._bufferService.scroll(e$2, t$2);
					}
					scrollLines(e$2, t$2, i$2) {
						this._bufferService.scrollLines(e$2, t$2, i$2);
					}
					scrollPages(e$2) {
						this.scrollLines(e$2 * (this.rows - 1));
					}
					scrollToTop() {
						this.scrollLines(-this._bufferService.buffer.ydisp);
					}
					scrollToBottom() {
						this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
					}
					scrollToLine(e$2) {
						const t$2 = e$2 - this._bufferService.buffer.ydisp;
						0 !== t$2 && this.scrollLines(t$2);
					}
					registerEscHandler(e$2, t$2) {
						return this._inputHandler.registerEscHandler(e$2, t$2);
					}
					registerDcsHandler(e$2, t$2) {
						return this._inputHandler.registerDcsHandler(e$2, t$2);
					}
					registerCsiHandler(e$2, t$2) {
						return this._inputHandler.registerCsiHandler(e$2, t$2);
					}
					registerOscHandler(e$2, t$2) {
						return this._inputHandler.registerOscHandler(e$2, t$2);
					}
					_setup() {
						this._handleWindowsPtyOptionChange();
					}
					reset() {
						this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
					}
					_handleWindowsPtyOptionChange() {
						let e$2 = !1;
						const t$2 = this.optionsService.rawOptions.windowsPty;
						t$2 && void 0 !== t$2.buildNumber && void 0 !== t$2.buildNumber ? e$2 = !!("conpty" === t$2.backend && t$2.buildNumber < 21376) : this.optionsService.rawOptions.windowsMode && (e$2 = !0), e$2 ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
					}
					_enableWindowsWrappingHeuristics() {
						if (!this._windowsWrappingHeuristics.value) {
							const e$2 = [];
							e$2.push(this.onLineFeed(f.updateWindowsModeWrappedState.bind(null, this._bufferService))), e$2.push(this.registerCsiHandler({ final: "H" }, (() => ((0, f.updateWindowsModeWrappedState)(this._bufferService), !1)))), this._windowsWrappingHeuristics.value = (0, s$1.toDisposable)((() => {
								for (const t$2 of e$2) t$2.dispose();
							}));
						}
					}
				}
				t$1.CoreTerminal = S;
			},
			8460: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.runAndSubscribe = t$1.forwardEvent = t$1.EventEmitter = void 0, t$1.EventEmitter = class {
					constructor() {
						this._listeners = [], this._disposed = !1;
					}
					get event() {
						return this._event || (this._event = (e$2) => (this._listeners.push(e$2), { dispose: () => {
							if (!this._disposed) {
								for (let t$2 = 0; t$2 < this._listeners.length; t$2++) if (this._listeners[t$2] === e$2) return void this._listeners.splice(t$2, 1);
							}
						} })), this._event;
					}
					fire(e$2, t$2) {
						const i$1 = [];
						for (let e$3 = 0; e$3 < this._listeners.length; e$3++) i$1.push(this._listeners[e$3]);
						for (let s$1 = 0; s$1 < i$1.length; s$1++) i$1[s$1].call(void 0, e$2, t$2);
					}
					dispose() {
						this.clearListeners(), this._disposed = !0;
					}
					clearListeners() {
						this._listeners && (this._listeners.length = 0);
					}
				}, t$1.forwardEvent = function(e$2, t$2) {
					return e$2(((e$3) => t$2.fire(e$3)));
				}, t$1.runAndSubscribe = function(e$2, t$2) {
					return t$2(void 0), e$2(((e$3) => t$2(e$3)));
				};
			},
			5435: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.InputHandler = t$1.WindowsOptionsReportType = void 0;
				const n = i$1(2584), o = i$1(7116), a = i$1(2015), h = i$1(844), c$1 = i$1(482), l = i$1(8437), d = i$1(8460), _ = i$1(643), u = i$1(511), f = i$1(3734), v = i$1(2585), p = i$1(1480), g = i$1(6242), m = i$1(6351), S = i$1(5941), C = {
					"(": 0,
					")": 1,
					"*": 2,
					"+": 3,
					"-": 1,
					".": 2
				}, b = 131072;
				function w(e$2, t$2) {
					if (e$2 > 24) return t$2.setWinLines || !1;
					switch (e$2) {
						case 1: return !!t$2.restoreWin;
						case 2: return !!t$2.minimizeWin;
						case 3: return !!t$2.setWinPosition;
						case 4: return !!t$2.setWinSizePixels;
						case 5: return !!t$2.raiseWin;
						case 6: return !!t$2.lowerWin;
						case 7: return !!t$2.refreshWin;
						case 8: return !!t$2.setWinSizeChars;
						case 9: return !!t$2.maximizeWin;
						case 10: return !!t$2.fullscreenWin;
						case 11: return !!t$2.getWinState;
						case 13: return !!t$2.getWinPosition;
						case 14: return !!t$2.getWinSizePixels;
						case 15: return !!t$2.getScreenSizePixels;
						case 16: return !!t$2.getCellSizePixels;
						case 18: return !!t$2.getWinSizeChars;
						case 19: return !!t$2.getScreenSizeChars;
						case 20: return !!t$2.getIconTitle;
						case 21: return !!t$2.getWinTitle;
						case 22: return !!t$2.pushTitle;
						case 23: return !!t$2.popTitle;
						case 24: return !!t$2.setWinLines;
					}
					return !1;
				}
				var y;
				(function(e$2) {
					e$2[e$2.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e$2[e$2.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
				})(y || (t$1.WindowsOptionsReportType = y = {}));
				let E = 0;
				class k extends h.Disposable {
					getAttrData() {
						return this._curAttrData;
					}
					constructor(e$2, t$2, i$2, s$2, r$1, h$1, _$1, f$1, v$1 = new a.EscapeSequenceParser()) {
						super(), this._bufferService = e$2, this._charsetService = t$2, this._coreService = i$2, this._logService = s$2, this._optionsService = r$1, this._oscLinkService = h$1, this._coreMouseService = _$1, this._unicodeService = f$1, this._parser = v$1, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new c$1.StringToUtf32(), this._utf8Decoder = new c$1.Utf8ToUtf32(), this._workCell = new u.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new d.EventEmitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new d.EventEmitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new d.EventEmitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new d.EventEmitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new d.EventEmitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new d.EventEmitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new d.EventEmitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new d.EventEmitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new d.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new d.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new d.EventEmitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new d.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new d.EventEmitter()), this.onColor = this._onColor.event, this._parseStack = {
							paused: !1,
							cursorStartX: 0,
							cursorStartY: 0,
							decodedLength: 0,
							position: 0
						}, this._specialColors = [
							256,
							257,
							258
						], this.register(this._parser), this._dirtyRowTracker = new L(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate(((e$3) => this._activeBuffer = e$3.activeBuffer))), this._parser.setCsiHandlerFallback(((e$3, t$3) => {
							this._logService.debug("Unknown CSI code: ", {
								identifier: this._parser.identToString(e$3),
								params: t$3.toArray()
							});
						})), this._parser.setEscHandlerFallback(((e$3) => {
							this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e$3) });
						})), this._parser.setExecuteHandlerFallback(((e$3) => {
							this._logService.debug("Unknown EXECUTE code: ", { code: e$3 });
						})), this._parser.setOscHandlerFallback(((e$3, t$3, i$3) => {
							this._logService.debug("Unknown OSC code: ", {
								identifier: e$3,
								action: t$3,
								data: i$3
							});
						})), this._parser.setDcsHandlerFallback(((e$3, t$3, i$3) => {
							"HOOK" === t$3 && (i$3 = i$3.toArray()), this._logService.debug("Unknown DCS code: ", {
								identifier: this._parser.identToString(e$3),
								action: t$3,
								payload: i$3
							});
						})), this._parser.setPrintHandler(((e$3, t$3, i$3) => this.print(e$3, t$3, i$3))), this._parser.registerCsiHandler({ final: "@" }, ((e$3) => this.insertChars(e$3))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "@"
						}, ((e$3) => this.scrollLeft(e$3))), this._parser.registerCsiHandler({ final: "A" }, ((e$3) => this.cursorUp(e$3))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "A"
						}, ((e$3) => this.scrollRight(e$3))), this._parser.registerCsiHandler({ final: "B" }, ((e$3) => this.cursorDown(e$3))), this._parser.registerCsiHandler({ final: "C" }, ((e$3) => this.cursorForward(e$3))), this._parser.registerCsiHandler({ final: "D" }, ((e$3) => this.cursorBackward(e$3))), this._parser.registerCsiHandler({ final: "E" }, ((e$3) => this.cursorNextLine(e$3))), this._parser.registerCsiHandler({ final: "F" }, ((e$3) => this.cursorPrecedingLine(e$3))), this._parser.registerCsiHandler({ final: "G" }, ((e$3) => this.cursorCharAbsolute(e$3))), this._parser.registerCsiHandler({ final: "H" }, ((e$3) => this.cursorPosition(e$3))), this._parser.registerCsiHandler({ final: "I" }, ((e$3) => this.cursorForwardTab(e$3))), this._parser.registerCsiHandler({ final: "J" }, ((e$3) => this.eraseInDisplay(e$3, !1))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "J"
						}, ((e$3) => this.eraseInDisplay(e$3, !0))), this._parser.registerCsiHandler({ final: "K" }, ((e$3) => this.eraseInLine(e$3, !1))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "K"
						}, ((e$3) => this.eraseInLine(e$3, !0))), this._parser.registerCsiHandler({ final: "L" }, ((e$3) => this.insertLines(e$3))), this._parser.registerCsiHandler({ final: "M" }, ((e$3) => this.deleteLines(e$3))), this._parser.registerCsiHandler({ final: "P" }, ((e$3) => this.deleteChars(e$3))), this._parser.registerCsiHandler({ final: "S" }, ((e$3) => this.scrollUp(e$3))), this._parser.registerCsiHandler({ final: "T" }, ((e$3) => this.scrollDown(e$3))), this._parser.registerCsiHandler({ final: "X" }, ((e$3) => this.eraseChars(e$3))), this._parser.registerCsiHandler({ final: "Z" }, ((e$3) => this.cursorBackwardTab(e$3))), this._parser.registerCsiHandler({ final: "`" }, ((e$3) => this.charPosAbsolute(e$3))), this._parser.registerCsiHandler({ final: "a" }, ((e$3) => this.hPositionRelative(e$3))), this._parser.registerCsiHandler({ final: "b" }, ((e$3) => this.repeatPrecedingCharacter(e$3))), this._parser.registerCsiHandler({ final: "c" }, ((e$3) => this.sendDeviceAttributesPrimary(e$3))), this._parser.registerCsiHandler({
							prefix: ">",
							final: "c"
						}, ((e$3) => this.sendDeviceAttributesSecondary(e$3))), this._parser.registerCsiHandler({ final: "d" }, ((e$3) => this.linePosAbsolute(e$3))), this._parser.registerCsiHandler({ final: "e" }, ((e$3) => this.vPositionRelative(e$3))), this._parser.registerCsiHandler({ final: "f" }, ((e$3) => this.hVPosition(e$3))), this._parser.registerCsiHandler({ final: "g" }, ((e$3) => this.tabClear(e$3))), this._parser.registerCsiHandler({ final: "h" }, ((e$3) => this.setMode(e$3))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "h"
						}, ((e$3) => this.setModePrivate(e$3))), this._parser.registerCsiHandler({ final: "l" }, ((e$3) => this.resetMode(e$3))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "l"
						}, ((e$3) => this.resetModePrivate(e$3))), this._parser.registerCsiHandler({ final: "m" }, ((e$3) => this.charAttributes(e$3))), this._parser.registerCsiHandler({ final: "n" }, ((e$3) => this.deviceStatus(e$3))), this._parser.registerCsiHandler({
							prefix: "?",
							final: "n"
						}, ((e$3) => this.deviceStatusPrivate(e$3))), this._parser.registerCsiHandler({
							intermediates: "!",
							final: "p"
						}, ((e$3) => this.softReset(e$3))), this._parser.registerCsiHandler({
							intermediates: " ",
							final: "q"
						}, ((e$3) => this.setCursorStyle(e$3))), this._parser.registerCsiHandler({ final: "r" }, ((e$3) => this.setScrollRegion(e$3))), this._parser.registerCsiHandler({ final: "s" }, ((e$3) => this.saveCursor(e$3))), this._parser.registerCsiHandler({ final: "t" }, ((e$3) => this.windowOptions(e$3))), this._parser.registerCsiHandler({ final: "u" }, ((e$3) => this.restoreCursor(e$3))), this._parser.registerCsiHandler({
							intermediates: "'",
							final: "}"
						}, ((e$3) => this.insertColumns(e$3))), this._parser.registerCsiHandler({
							intermediates: "'",
							final: "~"
						}, ((e$3) => this.deleteColumns(e$3))), this._parser.registerCsiHandler({
							intermediates: "\"",
							final: "q"
						}, ((e$3) => this.selectProtected(e$3))), this._parser.registerCsiHandler({
							intermediates: "$",
							final: "p"
						}, ((e$3) => this.requestMode(e$3, !0))), this._parser.registerCsiHandler({
							prefix: "?",
							intermediates: "$",
							final: "p"
						}, ((e$3) => this.requestMode(e$3, !1))), this._parser.setExecuteHandler(n.C0.BEL, (() => this.bell())), this._parser.setExecuteHandler(n.C0.LF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.VT, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.FF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.CR, (() => this.carriageReturn())), this._parser.setExecuteHandler(n.C0.BS, (() => this.backspace())), this._parser.setExecuteHandler(n.C0.HT, (() => this.tab())), this._parser.setExecuteHandler(n.C0.SO, (() => this.shiftOut())), this._parser.setExecuteHandler(n.C0.SI, (() => this.shiftIn())), this._parser.setExecuteHandler(n.C1.IND, (() => this.index())), this._parser.setExecuteHandler(n.C1.NEL, (() => this.nextLine())), this._parser.setExecuteHandler(n.C1.HTS, (() => this.tabSet())), this._parser.registerOscHandler(0, new g.OscHandler(((e$3) => (this.setTitle(e$3), this.setIconName(e$3), !0)))), this._parser.registerOscHandler(1, new g.OscHandler(((e$3) => this.setIconName(e$3)))), this._parser.registerOscHandler(2, new g.OscHandler(((e$3) => this.setTitle(e$3)))), this._parser.registerOscHandler(4, new g.OscHandler(((e$3) => this.setOrReportIndexedColor(e$3)))), this._parser.registerOscHandler(8, new g.OscHandler(((e$3) => this.setHyperlink(e$3)))), this._parser.registerOscHandler(10, new g.OscHandler(((e$3) => this.setOrReportFgColor(e$3)))), this._parser.registerOscHandler(11, new g.OscHandler(((e$3) => this.setOrReportBgColor(e$3)))), this._parser.registerOscHandler(12, new g.OscHandler(((e$3) => this.setOrReportCursorColor(e$3)))), this._parser.registerOscHandler(104, new g.OscHandler(((e$3) => this.restoreIndexedColor(e$3)))), this._parser.registerOscHandler(110, new g.OscHandler(((e$3) => this.restoreFgColor(e$3)))), this._parser.registerOscHandler(111, new g.OscHandler(((e$3) => this.restoreBgColor(e$3)))), this._parser.registerOscHandler(112, new g.OscHandler(((e$3) => this.restoreCursorColor(e$3)))), this._parser.registerEscHandler({ final: "7" }, (() => this.saveCursor())), this._parser.registerEscHandler({ final: "8" }, (() => this.restoreCursor())), this._parser.registerEscHandler({ final: "D" }, (() => this.index())), this._parser.registerEscHandler({ final: "E" }, (() => this.nextLine())), this._parser.registerEscHandler({ final: "H" }, (() => this.tabSet())), this._parser.registerEscHandler({ final: "M" }, (() => this.reverseIndex())), this._parser.registerEscHandler({ final: "=" }, (() => this.keypadApplicationMode())), this._parser.registerEscHandler({ final: ">" }, (() => this.keypadNumericMode())), this._parser.registerEscHandler({ final: "c" }, (() => this.fullReset())), this._parser.registerEscHandler({ final: "n" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "o" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "|" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "}" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "~" }, (() => this.setgLevel(1))), this._parser.registerEscHandler({
							intermediates: "%",
							final: "@"
						}, (() => this.selectDefaultCharset())), this._parser.registerEscHandler({
							intermediates: "%",
							final: "G"
						}, (() => this.selectDefaultCharset()));
						for (const e$3 in o.CHARSETS) this._parser.registerEscHandler({
							intermediates: "(",
							final: e$3
						}, (() => this.selectCharset("(" + e$3))), this._parser.registerEscHandler({
							intermediates: ")",
							final: e$3
						}, (() => this.selectCharset(")" + e$3))), this._parser.registerEscHandler({
							intermediates: "*",
							final: e$3
						}, (() => this.selectCharset("*" + e$3))), this._parser.registerEscHandler({
							intermediates: "+",
							final: e$3
						}, (() => this.selectCharset("+" + e$3))), this._parser.registerEscHandler({
							intermediates: "-",
							final: e$3
						}, (() => this.selectCharset("-" + e$3))), this._parser.registerEscHandler({
							intermediates: ".",
							final: e$3
						}, (() => this.selectCharset("." + e$3))), this._parser.registerEscHandler({
							intermediates: "/",
							final: e$3
						}, (() => this.selectCharset("/" + e$3)));
						this._parser.registerEscHandler({
							intermediates: "#",
							final: "8"
						}, (() => this.screenAlignmentPattern())), this._parser.setErrorHandler(((e$3) => (this._logService.error("Parsing error: ", e$3), e$3))), this._parser.registerDcsHandler({
							intermediates: "$",
							final: "q"
						}, new m.DcsHandler(((e$3, t$3) => this.requestStatusString(e$3, t$3))));
					}
					_preserveStack(e$2, t$2, i$2, s$2) {
						this._parseStack.paused = !0, this._parseStack.cursorStartX = e$2, this._parseStack.cursorStartY = t$2, this._parseStack.decodedLength = i$2, this._parseStack.position = s$2;
					}
					_logSlowResolvingAsync(e$2) {
						this._logService.logLevel <= v.LogLevelEnum.WARN && Promise.race([e$2, new Promise(((e$3, t$2) => setTimeout((() => t$2("#SLOW_TIMEOUT")), 5e3)))]).catch(((e$3) => {
							if ("#SLOW_TIMEOUT" !== e$3) throw e$3;
							console.warn("async parser handler taking longer than 5000 ms");
						}));
					}
					_getCurrentLinkId() {
						return this._curAttrData.extended.urlId;
					}
					parse(e$2, t$2) {
						let i$2, s$2 = this._activeBuffer.x, r$1 = this._activeBuffer.y, n$1 = 0;
						const o$1 = this._parseStack.paused;
						if (o$1) {
							if (i$2 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t$2)) return this._logSlowResolvingAsync(i$2), i$2;
							s$2 = this._parseStack.cursorStartX, r$1 = this._parseStack.cursorStartY, this._parseStack.paused = !1, e$2.length > b && (n$1 = this._parseStack.position + b);
						}
						if (this._logService.logLevel <= v.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + ("string" == typeof e$2 ? ` "${e$2}"` : ` "${Array.prototype.map.call(e$2, ((e$3) => String.fromCharCode(e$3))).join("")}"`), "string" == typeof e$2 ? e$2.split("").map(((e$3) => e$3.charCodeAt(0))) : e$2), this._parseBuffer.length < e$2.length && this._parseBuffer.length < b && (this._parseBuffer = new Uint32Array(Math.min(e$2.length, b))), o$1 || this._dirtyRowTracker.clearRange(), e$2.length > b) for (let t$3 = n$1; t$3 < e$2.length; t$3 += b) {
							const n$2 = t$3 + b < e$2.length ? t$3 + b : e$2.length, o$2 = "string" == typeof e$2 ? this._stringDecoder.decode(e$2.substring(t$3, n$2), this._parseBuffer) : this._utf8Decoder.decode(e$2.subarray(t$3, n$2), this._parseBuffer);
							if (i$2 = this._parser.parse(this._parseBuffer, o$2)) return this._preserveStack(s$2, r$1, o$2, t$3), this._logSlowResolvingAsync(i$2), i$2;
						}
						else if (!o$1) {
							const t$3 = "string" == typeof e$2 ? this._stringDecoder.decode(e$2, this._parseBuffer) : this._utf8Decoder.decode(e$2, this._parseBuffer);
							if (i$2 = this._parser.parse(this._parseBuffer, t$3)) return this._preserveStack(s$2, r$1, t$3, 0), this._logSlowResolvingAsync(i$2), i$2;
						}
						this._activeBuffer.x === s$2 && this._activeBuffer.y === r$1 || this._onCursorMove.fire();
						const a$1 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h$1 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
						h$1 < this._bufferService.rows && this._onRequestRefreshRows.fire(Math.min(h$1, this._bufferService.rows - 1), Math.min(a$1, this._bufferService.rows - 1));
					}
					print(e$2, t$2, i$2) {
						let s$2, r$1;
						const n$1 = this._charsetService.charset, o$1 = this._optionsService.rawOptions.screenReaderMode, a$1 = this._bufferService.cols, h$1 = this._coreService.decPrivateModes.wraparound, d$1 = this._coreService.modes.insertMode, u$1 = this._curAttrData;
						let f$1 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i$2 - t$2 > 0 && 2 === f$1.getWidth(this._activeBuffer.x - 1) && f$1.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, u$1);
						let v$1 = this._parser.precedingJoinState;
						for (let g$1 = t$2; g$1 < i$2; ++g$1) {
							if (s$2 = e$2[g$1], s$2 < 127 && n$1) {
								const e$3 = n$1[String.fromCharCode(s$2)];
								e$3 && (s$2 = e$3.charCodeAt(0));
							}
							const t$3 = this._unicodeService.charProperties(s$2, v$1);
							r$1 = p.UnicodeService.extractWidth(t$3);
							const i$3 = p.UnicodeService.extractShouldJoin(t$3), m$1 = i$3 ? p.UnicodeService.extractWidth(v$1) : 0;
							if (v$1 = t$3, o$1 && this._onA11yChar.fire((0, c$1.stringFromCodePoint)(s$2)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + r$1 - m$1 > a$1) {
								if (h$1) {
									const e$3 = f$1;
									let t$4 = this._activeBuffer.x - m$1;
									for (this._activeBuffer.x = m$1, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), !0)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !0), f$1 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), m$1 > 0 && f$1 instanceof l.BufferLine && f$1.copyCellsFrom(e$3, t$4, 0, m$1, !1); t$4 < a$1;) e$3.setCellFromCodepoint(t$4++, 0, 1, u$1);
								} else if (this._activeBuffer.x = a$1 - 1, 2 === r$1) continue;
							}
							if (i$3 && this._activeBuffer.x) {
								const e$3 = f$1.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
								f$1.addCodepointToCell(this._activeBuffer.x - e$3, s$2, r$1);
								for (let e$4 = r$1 - m$1; --e$4 >= 0;) f$1.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u$1);
							} else if (d$1 && (f$1.insertCells(this._activeBuffer.x, r$1 - m$1, this._activeBuffer.getNullCell(u$1)), 2 === f$1.getWidth(a$1 - 1) && f$1.setCellFromCodepoint(a$1 - 1, _.NULL_CELL_CODE, _.NULL_CELL_WIDTH, u$1)), f$1.setCellFromCodepoint(this._activeBuffer.x++, s$2, r$1, u$1), r$1 > 0) for (; --r$1;) f$1.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u$1);
						}
						this._parser.precedingJoinState = v$1, this._activeBuffer.x < a$1 && i$2 - t$2 > 0 && 0 === f$1.getWidth(this._activeBuffer.x) && !f$1.hasContent(this._activeBuffer.x) && f$1.setCellFromCodepoint(this._activeBuffer.x, 0, 1, u$1), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					registerCsiHandler(e$2, t$2) {
						return "t" !== e$2.final || e$2.prefix || e$2.intermediates ? this._parser.registerCsiHandler(e$2, t$2) : this._parser.registerCsiHandler(e$2, ((e$3) => !w(e$3.params[0], this._optionsService.rawOptions.windowOptions) || t$2(e$3)));
					}
					registerDcsHandler(e$2, t$2) {
						return this._parser.registerDcsHandler(e$2, new m.DcsHandler(t$2));
					}
					registerEscHandler(e$2, t$2) {
						return this._parser.registerEscHandler(e$2, t$2);
					}
					registerOscHandler(e$2, t$2) {
						return this._parser.registerOscHandler(e$2, new g.OscHandler(t$2));
					}
					bell() {
						return this._onRequestBell.fire(), !0;
					}
					lineFeed() {
						return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), !0;
					}
					carriageReturn() {
						return this._activeBuffer.x = 0, !0;
					}
					backspace() {
						if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, !0;
						if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
						else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
							this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
							const e$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
							e$2.hasWidth(this._activeBuffer.x) && !e$2.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
						}
						return this._restrictCursor(), !0;
					}
					tab() {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						const e$2 = this._activeBuffer.x;
						return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e$2), !0;
					}
					shiftOut() {
						return this._charsetService.setgLevel(1), !0;
					}
					shiftIn() {
						return this._charsetService.setgLevel(0), !0;
					}
					_restrictCursor(e$2 = this._bufferService.cols - 1) {
						this._activeBuffer.x = Math.min(e$2, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					_setCursor(e$2, t$2) {
						this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e$2, this._activeBuffer.y = this._activeBuffer.scrollTop + t$2) : (this._activeBuffer.x = e$2, this._activeBuffer.y = t$2), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
					}
					_moveCursor(e$2, t$2) {
						this._restrictCursor(), this._setCursor(this._activeBuffer.x + e$2, this._activeBuffer.y + t$2);
					}
					cursorUp(e$2) {
						const t$2 = this._activeBuffer.y - this._activeBuffer.scrollTop;
						return t$2 >= 0 ? this._moveCursor(0, -Math.min(t$2, e$2.params[0] || 1)) : this._moveCursor(0, -(e$2.params[0] || 1)), !0;
					}
					cursorDown(e$2) {
						const t$2 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
						return t$2 >= 0 ? this._moveCursor(0, Math.min(t$2, e$2.params[0] || 1)) : this._moveCursor(0, e$2.params[0] || 1), !0;
					}
					cursorForward(e$2) {
						return this._moveCursor(e$2.params[0] || 1, 0), !0;
					}
					cursorBackward(e$2) {
						return this._moveCursor(-(e$2.params[0] || 1), 0), !0;
					}
					cursorNextLine(e$2) {
						return this.cursorDown(e$2), this._activeBuffer.x = 0, !0;
					}
					cursorPrecedingLine(e$2) {
						return this.cursorUp(e$2), this._activeBuffer.x = 0, !0;
					}
					cursorCharAbsolute(e$2) {
						return this._setCursor((e$2.params[0] || 1) - 1, this._activeBuffer.y), !0;
					}
					cursorPosition(e$2) {
						return this._setCursor(e$2.length >= 2 ? (e$2.params[1] || 1) - 1 : 0, (e$2.params[0] || 1) - 1), !0;
					}
					charPosAbsolute(e$2) {
						return this._setCursor((e$2.params[0] || 1) - 1, this._activeBuffer.y), !0;
					}
					hPositionRelative(e$2) {
						return this._moveCursor(e$2.params[0] || 1, 0), !0;
					}
					linePosAbsolute(e$2) {
						return this._setCursor(this._activeBuffer.x, (e$2.params[0] || 1) - 1), !0;
					}
					vPositionRelative(e$2) {
						return this._moveCursor(0, e$2.params[0] || 1), !0;
					}
					hVPosition(e$2) {
						return this.cursorPosition(e$2), !0;
					}
					tabClear(e$2) {
						const t$2 = e$2.params[0];
						return 0 === t$2 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t$2 && (this._activeBuffer.tabs = {}), !0;
					}
					cursorForwardTab(e$2) {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						let t$2 = e$2.params[0] || 1;
						for (; t$2--;) this._activeBuffer.x = this._activeBuffer.nextStop();
						return !0;
					}
					cursorBackwardTab(e$2) {
						if (this._activeBuffer.x >= this._bufferService.cols) return !0;
						let t$2 = e$2.params[0] || 1;
						for (; t$2--;) this._activeBuffer.x = this._activeBuffer.prevStop();
						return !0;
					}
					selectProtected(e$2) {
						const t$2 = e$2.params[0];
						return 1 === t$2 && (this._curAttrData.bg |= 536870912), 2 !== t$2 && 0 !== t$2 || (this._curAttrData.bg &= -536870913), !0;
					}
					_eraseInBufferLine(e$2, t$2, i$2, s$2 = !1, r$1 = !1) {
						const n$1 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$2);
						n$1.replaceCells(t$2, i$2, this._activeBuffer.getNullCell(this._eraseAttrData()), r$1), s$2 && (n$1.isWrapped = !1);
					}
					_resetBufferLine(e$2, t$2 = !1) {
						const i$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$2);
						i$2 && (i$2.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t$2), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e$2), i$2.isWrapped = !1);
					}
					eraseInDisplay(e$2, t$2 = !1) {
						let i$2;
						switch (this._restrictCursor(this._bufferService.cols), e$2.params[0]) {
							case 0:
								for (i$2 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i$2), this._eraseInBufferLine(i$2++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t$2); i$2 < this._bufferService.rows; i$2++) this._resetBufferLine(i$2, t$2);
								this._dirtyRowTracker.markDirty(i$2);
								break;
							case 1:
								for (i$2 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i$2), this._eraseInBufferLine(i$2, 0, this._activeBuffer.x + 1, !0, t$2), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i$2 + 1).isWrapped = !1); i$2--;) this._resetBufferLine(i$2, t$2);
								this._dirtyRowTracker.markDirty(0);
								break;
							case 2:
								for (i$2 = this._bufferService.rows, this._dirtyRowTracker.markDirty(i$2 - 1); i$2--;) this._resetBufferLine(i$2, t$2);
								this._dirtyRowTracker.markDirty(0);
								break;
							case 3:
								const e$3 = this._activeBuffer.lines.length - this._bufferService.rows;
								e$3 > 0 && (this._activeBuffer.lines.trimStart(e$3), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e$3, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e$3, 0), this._onScroll.fire(0));
						}
						return !0;
					}
					eraseInLine(e$2, t$2 = !1) {
						switch (this._restrictCursor(this._bufferService.cols), e$2.params[0]) {
							case 0:
								this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t$2);
								break;
							case 1:
								this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, !1, t$2);
								break;
							case 2: this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, !0, t$2);
						}
						return this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0;
					}
					insertLines(e$2) {
						this._restrictCursor();
						let t$2 = e$2.params[0] || 1;
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const i$2 = this._activeBuffer.ybase + this._activeBuffer.y, s$2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r$1 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s$2 + 1;
						for (; t$2--;) this._activeBuffer.lines.splice(r$1 - 1, 1), this._activeBuffer.lines.splice(i$2, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
					}
					deleteLines(e$2) {
						this._restrictCursor();
						let t$2 = e$2.params[0] || 1;
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const i$2 = this._activeBuffer.ybase + this._activeBuffer.y;
						let s$2;
						for (s$2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s$2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s$2; t$2--;) this._activeBuffer.lines.splice(i$2, 1), this._activeBuffer.lines.splice(s$2, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
					}
					insertChars(e$2) {
						this._restrictCursor();
						const t$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t$2 && (t$2.insertCells(this._activeBuffer.x, e$2.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					deleteChars(e$2) {
						this._restrictCursor();
						const t$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t$2 && (t$2.deleteCells(this._activeBuffer.x, e$2.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					scrollUp(e$2) {
						let t$2 = e$2.params[0] || 1;
						for (; t$2--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollDown(e$2) {
						let t$2 = e$2.params[0] || 1;
						for (; t$2--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(l.DEFAULT_ATTR_DATA));
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollLeft(e$2) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t$2 = e$2.params[0] || 1;
						for (let e$3 = this._activeBuffer.scrollTop; e$3 <= this._activeBuffer.scrollBottom; ++e$3) {
							const i$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$3);
							i$2.deleteCells(0, t$2, this._activeBuffer.getNullCell(this._eraseAttrData())), i$2.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					scrollRight(e$2) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t$2 = e$2.params[0] || 1;
						for (let e$3 = this._activeBuffer.scrollTop; e$3 <= this._activeBuffer.scrollBottom; ++e$3) {
							const i$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$3);
							i$2.insertCells(0, t$2, this._activeBuffer.getNullCell(this._eraseAttrData())), i$2.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					insertColumns(e$2) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t$2 = e$2.params[0] || 1;
						for (let e$3 = this._activeBuffer.scrollTop; e$3 <= this._activeBuffer.scrollBottom; ++e$3) {
							const i$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$3);
							i$2.insertCells(this._activeBuffer.x, t$2, this._activeBuffer.getNullCell(this._eraseAttrData())), i$2.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					deleteColumns(e$2) {
						if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
						const t$2 = e$2.params[0] || 1;
						for (let e$3 = this._activeBuffer.scrollTop; e$3 <= this._activeBuffer.scrollBottom; ++e$3) {
							const i$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e$3);
							i$2.deleteCells(this._activeBuffer.x, t$2, this._activeBuffer.getNullCell(this._eraseAttrData())), i$2.isWrapped = !1;
						}
						return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
					}
					eraseChars(e$2) {
						this._restrictCursor();
						const t$2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
						return t$2 && (t$2.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e$2.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
					}
					repeatPrecedingCharacter(e$2) {
						const t$2 = this._parser.precedingJoinState;
						if (!t$2) return !0;
						const i$2 = e$2.params[0] || 1, s$2 = p.UnicodeService.extractWidth(t$2), r$1 = this._activeBuffer.x - s$2, n$1 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(r$1), o$1 = new Uint32Array(n$1.length * i$2);
						let a$1 = 0;
						for (let e$3 = 0; e$3 < n$1.length;) {
							const t$3 = n$1.codePointAt(e$3) || 0;
							o$1[a$1++] = t$3, e$3 += t$3 > 65535 ? 2 : 1;
						}
						let h$1 = a$1;
						for (let e$3 = 1; e$3 < i$2; ++e$3) o$1.copyWithin(h$1, 0, a$1), h$1 += a$1;
						return this.print(o$1, 0, h$1), !0;
					}
					sendDeviceAttributesPrimary(e$2) {
						return e$2.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), !0;
					}
					sendDeviceAttributesSecondary(e$2) {
						return e$2.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e$2.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), !0;
					}
					_is(e$2) {
						return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e$2);
					}
					setMode(e$2) {
						for (let t$2 = 0; t$2 < e$2.length; t$2++) switch (e$2.params[t$2]) {
							case 4:
								this._coreService.modes.insertMode = !0;
								break;
							case 20: this._optionsService.options.convertEol = !0;
						}
						return !0;
					}
					setModePrivate(e$2) {
						for (let t$2 = 0; t$2 < e$2.length; t$2++) switch (e$2.params[t$2]) {
							case 1:
								this._coreService.decPrivateModes.applicationCursorKeys = !0;
								break;
							case 2:
								this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
								break;
							case 3:
								this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
								break;
							case 6:
								this._coreService.decPrivateModes.origin = !0, this._setCursor(0, 0);
								break;
							case 7:
								this._coreService.decPrivateModes.wraparound = !0;
								break;
							case 12:
								this._optionsService.options.cursorBlink = !0;
								break;
							case 45:
								this._coreService.decPrivateModes.reverseWraparound = !0;
								break;
							case 66:
								this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire();
								break;
							case 9:
								this._coreMouseService.activeProtocol = "X10";
								break;
							case 1e3:
								this._coreMouseService.activeProtocol = "VT200";
								break;
							case 1002:
								this._coreMouseService.activeProtocol = "DRAG";
								break;
							case 1003:
								this._coreMouseService.activeProtocol = "ANY";
								break;
							case 1004:
								this._coreService.decPrivateModes.sendFocus = !0, this._onRequestSendFocus.fire();
								break;
							case 1005:
								this._logService.debug("DECSET 1005 not supported (see #2507)");
								break;
							case 1006:
								this._coreMouseService.activeEncoding = "SGR";
								break;
							case 1015:
								this._logService.debug("DECSET 1015 not supported (see #2507)");
								break;
							case 1016:
								this._coreMouseService.activeEncoding = "SGR_PIXELS";
								break;
							case 25:
								this._coreService.isCursorHidden = !1;
								break;
							case 1048:
								this.saveCursor();
								break;
							case 1049: this.saveCursor();
							case 47:
							case 1047:
								this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
								break;
							case 2004: this._coreService.decPrivateModes.bracketedPasteMode = !0;
						}
						return !0;
					}
					resetMode(e$2) {
						for (let t$2 = 0; t$2 < e$2.length; t$2++) switch (e$2.params[t$2]) {
							case 4:
								this._coreService.modes.insertMode = !1;
								break;
							case 20: this._optionsService.options.convertEol = !1;
						}
						return !0;
					}
					resetModePrivate(e$2) {
						for (let t$2 = 0; t$2 < e$2.length; t$2++) switch (e$2.params[t$2]) {
							case 1:
								this._coreService.decPrivateModes.applicationCursorKeys = !1;
								break;
							case 3:
								this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
								break;
							case 6:
								this._coreService.decPrivateModes.origin = !1, this._setCursor(0, 0);
								break;
							case 7:
								this._coreService.decPrivateModes.wraparound = !1;
								break;
							case 12:
								this._optionsService.options.cursorBlink = !1;
								break;
							case 45:
								this._coreService.decPrivateModes.reverseWraparound = !1;
								break;
							case 66:
								this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire();
								break;
							case 9:
							case 1e3:
							case 1002:
							case 1003:
								this._coreMouseService.activeProtocol = "NONE";
								break;
							case 1004:
								this._coreService.decPrivateModes.sendFocus = !1;
								break;
							case 1005:
								this._logService.debug("DECRST 1005 not supported (see #2507)");
								break;
							case 1006:
							case 1016:
								this._coreMouseService.activeEncoding = "DEFAULT";
								break;
							case 1015:
								this._logService.debug("DECRST 1015 not supported (see #2507)");
								break;
							case 25:
								this._coreService.isCursorHidden = !0;
								break;
							case 1048:
								this.restoreCursor();
								break;
							case 1049:
							case 47:
							case 1047:
								this._bufferService.buffers.activateNormalBuffer(), 1049 === e$2.params[t$2] && this.restoreCursor(), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
								break;
							case 2004: this._coreService.decPrivateModes.bracketedPasteMode = !1;
						}
						return !0;
					}
					requestMode(e$2, t$2) {
						const i$2 = this._coreService.decPrivateModes, { activeProtocol: s$2, activeEncoding: r$1 } = this._coreMouseService, o$1 = this._coreService, { buffers: a$1, cols: h$1 } = this._bufferService, { active: c$2, alt: l$1 } = a$1, d$1 = this._optionsService.rawOptions, _$1 = (e$3) => e$3 ? 1 : 2, u$1 = e$2.params[0];
						return f$1 = u$1, v$1 = t$2 ? 2 === u$1 ? 4 : 4 === u$1 ? _$1(o$1.modes.insertMode) : 12 === u$1 ? 3 : 20 === u$1 ? _$1(d$1.convertEol) : 0 : 1 === u$1 ? _$1(i$2.applicationCursorKeys) : 3 === u$1 ? d$1.windowOptions.setWinLines ? 80 === h$1 ? 2 : 132 === h$1 ? 1 : 0 : 0 : 6 === u$1 ? _$1(i$2.origin) : 7 === u$1 ? _$1(i$2.wraparound) : 8 === u$1 ? 3 : 9 === u$1 ? _$1("X10" === s$2) : 12 === u$1 ? _$1(d$1.cursorBlink) : 25 === u$1 ? _$1(!o$1.isCursorHidden) : 45 === u$1 ? _$1(i$2.reverseWraparound) : 66 === u$1 ? _$1(i$2.applicationKeypad) : 67 === u$1 ? 4 : 1e3 === u$1 ? _$1("VT200" === s$2) : 1002 === u$1 ? _$1("DRAG" === s$2) : 1003 === u$1 ? _$1("ANY" === s$2) : 1004 === u$1 ? _$1(i$2.sendFocus) : 1005 === u$1 ? 4 : 1006 === u$1 ? _$1("SGR" === r$1) : 1015 === u$1 ? 4 : 1016 === u$1 ? _$1("SGR_PIXELS" === r$1) : 1048 === u$1 ? 1 : 47 === u$1 || 1047 === u$1 || 1049 === u$1 ? _$1(c$2 === l$1) : 2004 === u$1 ? _$1(i$2.bracketedPasteMode) : 0, o$1.triggerDataEvent(`${n.C0.ESC}[${t$2 ? "" : "?"}${f$1};${v$1}$y`), !0;
						var f$1, v$1;
					}
					_updateAttrColor(e$2, t$2, i$2, s$2, r$1) {
						return 2 === t$2 ? (e$2 |= 50331648, e$2 &= -16777216, e$2 |= f.AttributeData.fromColorRGB([
							i$2,
							s$2,
							r$1
						])) : 5 === t$2 && (e$2 &= -50331904, e$2 |= 33554432 | 255 & i$2), e$2;
					}
					_extractColor(e$2, t$2, i$2) {
						const s$2 = [
							0,
							0,
							-1,
							0,
							0,
							0
						];
						let r$1 = 0, n$1 = 0;
						do {
							if (s$2[n$1 + r$1] = e$2.params[t$2 + n$1], e$2.hasSubParams(t$2 + n$1)) {
								const i$3 = e$2.getSubParams(t$2 + n$1);
								let o$1 = 0;
								do
									5 === s$2[1] && (r$1 = 1), s$2[n$1 + o$1 + 1 + r$1] = i$3[o$1];
								while (++o$1 < i$3.length && o$1 + n$1 + 1 + r$1 < s$2.length);
								break;
							}
							if (5 === s$2[1] && n$1 + r$1 >= 2 || 2 === s$2[1] && n$1 + r$1 >= 5) break;
							s$2[1] && (r$1 = 1);
						} while (++n$1 + t$2 < e$2.length && n$1 + r$1 < s$2.length);
						for (let e$3 = 2; e$3 < s$2.length; ++e$3) -1 === s$2[e$3] && (s$2[e$3] = 0);
						switch (s$2[0]) {
							case 38:
								i$2.fg = this._updateAttrColor(i$2.fg, s$2[1], s$2[3], s$2[4], s$2[5]);
								break;
							case 48:
								i$2.bg = this._updateAttrColor(i$2.bg, s$2[1], s$2[3], s$2[4], s$2[5]);
								break;
							case 58: i$2.extended = i$2.extended.clone(), i$2.extended.underlineColor = this._updateAttrColor(i$2.extended.underlineColor, s$2[1], s$2[3], s$2[4], s$2[5]);
						}
						return n$1;
					}
					_processUnderline(e$2, t$2) {
						t$2.extended = t$2.extended.clone(), (!~e$2 || e$2 > 5) && (e$2 = 1), t$2.extended.underlineStyle = e$2, t$2.fg |= 268435456, 0 === e$2 && (t$2.fg &= -268435457), t$2.updateExtended();
					}
					_processSGR0(e$2) {
						e$2.fg = l.DEFAULT_ATTR_DATA.fg, e$2.bg = l.DEFAULT_ATTR_DATA.bg, e$2.extended = e$2.extended.clone(), e$2.extended.underlineStyle = 0, e$2.extended.underlineColor &= -67108864, e$2.updateExtended();
					}
					charAttributes(e$2) {
						if (1 === e$2.length && 0 === e$2.params[0]) return this._processSGR0(this._curAttrData), !0;
						const t$2 = e$2.length;
						let i$2;
						const s$2 = this._curAttrData;
						for (let r$1 = 0; r$1 < t$2; r$1++) i$2 = e$2.params[r$1], i$2 >= 30 && i$2 <= 37 ? (s$2.fg &= -50331904, s$2.fg |= 16777216 | i$2 - 30) : i$2 >= 40 && i$2 <= 47 ? (s$2.bg &= -50331904, s$2.bg |= 16777216 | i$2 - 40) : i$2 >= 90 && i$2 <= 97 ? (s$2.fg &= -50331904, s$2.fg |= 16777224 | i$2 - 90) : i$2 >= 100 && i$2 <= 107 ? (s$2.bg &= -50331904, s$2.bg |= 16777224 | i$2 - 100) : 0 === i$2 ? this._processSGR0(s$2) : 1 === i$2 ? s$2.fg |= 134217728 : 3 === i$2 ? s$2.bg |= 67108864 : 4 === i$2 ? (s$2.fg |= 268435456, this._processUnderline(e$2.hasSubParams(r$1) ? e$2.getSubParams(r$1)[0] : 1, s$2)) : 5 === i$2 ? s$2.fg |= 536870912 : 7 === i$2 ? s$2.fg |= 67108864 : 8 === i$2 ? s$2.fg |= 1073741824 : 9 === i$2 ? s$2.fg |= 2147483648 : 2 === i$2 ? s$2.bg |= 134217728 : 21 === i$2 ? this._processUnderline(2, s$2) : 22 === i$2 ? (s$2.fg &= -134217729, s$2.bg &= -134217729) : 23 === i$2 ? s$2.bg &= -67108865 : 24 === i$2 ? (s$2.fg &= -268435457, this._processUnderline(0, s$2)) : 25 === i$2 ? s$2.fg &= -536870913 : 27 === i$2 ? s$2.fg &= -67108865 : 28 === i$2 ? s$2.fg &= -1073741825 : 29 === i$2 ? s$2.fg &= 2147483647 : 39 === i$2 ? (s$2.fg &= -67108864, s$2.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg) : 49 === i$2 ? (s$2.bg &= -67108864, s$2.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : 38 === i$2 || 48 === i$2 || 58 === i$2 ? r$1 += this._extractColor(e$2, r$1, s$2) : 53 === i$2 ? s$2.bg |= 1073741824 : 55 === i$2 ? s$2.bg &= -1073741825 : 59 === i$2 ? (s$2.extended = s$2.extended.clone(), s$2.extended.underlineColor = -1, s$2.updateExtended()) : 100 === i$2 ? (s$2.fg &= -67108864, s$2.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg, s$2.bg &= -67108864, s$2.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i$2);
						return !0;
					}
					deviceStatus(e$2) {
						switch (e$2.params[0]) {
							case 5:
								this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
								break;
							case 6:
								const e$3 = this._activeBuffer.y + 1, t$2 = this._activeBuffer.x + 1;
								this._coreService.triggerDataEvent(`${n.C0.ESC}[${e$3};${t$2}R`);
						}
						return !0;
					}
					deviceStatusPrivate(e$2) {
						if (6 === e$2.params[0]) {
							const e$3 = this._activeBuffer.y + 1, t$2 = this._activeBuffer.x + 1;
							this._coreService.triggerDataEvent(`${n.C0.ESC}[?${e$3};${t$2}R`);
						}
						return !0;
					}
					softReset(e$2) {
						return this._coreService.isCursorHidden = !1, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = !1, !0;
					}
					setCursorStyle(e$2) {
						const t$2 = e$2.params[0] || 1;
						switch (t$2) {
							case 1:
							case 2:
								this._optionsService.options.cursorStyle = "block";
								break;
							case 3:
							case 4:
								this._optionsService.options.cursorStyle = "underline";
								break;
							case 5:
							case 6: this._optionsService.options.cursorStyle = "bar";
						}
						const i$2 = t$2 % 2 == 1;
						return this._optionsService.options.cursorBlink = i$2, !0;
					}
					setScrollRegion(e$2) {
						const t$2 = e$2.params[0] || 1;
						let i$2;
						return (e$2.length < 2 || (i$2 = e$2.params[1]) > this._bufferService.rows || 0 === i$2) && (i$2 = this._bufferService.rows), i$2 > t$2 && (this._activeBuffer.scrollTop = t$2 - 1, this._activeBuffer.scrollBottom = i$2 - 1, this._setCursor(0, 0)), !0;
					}
					windowOptions(e$2) {
						if (!w(e$2.params[0], this._optionsService.rawOptions.windowOptions)) return !0;
						const t$2 = e$2.length > 1 ? e$2.params[1] : 0;
						switch (e$2.params[0]) {
							case 14:
								2 !== t$2 && this._onRequestWindowsOptionsReport.fire(y.GET_WIN_SIZE_PIXELS);
								break;
							case 16:
								this._onRequestWindowsOptionsReport.fire(y.GET_CELL_SIZE_PIXELS);
								break;
							case 18:
								this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
								break;
							case 22:
								0 !== t$2 && 2 !== t$2 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t$2 && 1 !== t$2 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
								break;
							case 23: 0 !== t$2 && 2 !== t$2 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t$2 && 1 !== t$2 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
						}
						return !0;
					}
					saveCursor(e$2) {
						return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, !0;
					}
					restoreCursor(e$2) {
						return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), !0;
					}
					setTitle(e$2) {
						return this._windowTitle = e$2, this._onTitleChange.fire(e$2), !0;
					}
					setIconName(e$2) {
						return this._iconName = e$2, !0;
					}
					setOrReportIndexedColor(e$2) {
						const t$2 = [], i$2 = e$2.split(";");
						for (; i$2.length > 1;) {
							const e$3 = i$2.shift(), s$2 = i$2.shift();
							if (/^\d+$/.exec(e$3)) {
								const i$3 = parseInt(e$3);
								if (D(i$3)) if ("?" === s$2) t$2.push({
									type: 0,
									index: i$3
								});
								else {
									const e$4 = (0, S.parseColor)(s$2);
									e$4 && t$2.push({
										type: 1,
										index: i$3,
										color: e$4
									});
								}
							}
						}
						return t$2.length && this._onColor.fire(t$2), !0;
					}
					setHyperlink(e$2) {
						const t$2 = e$2.split(";");
						return !(t$2.length < 2) && (t$2[1] ? this._createHyperlink(t$2[0], t$2[1]) : !t$2[0] && this._finishHyperlink());
					}
					_createHyperlink(e$2, t$2) {
						this._getCurrentLinkId() && this._finishHyperlink();
						const i$2 = e$2.split(":");
						let s$2;
						const r$1 = i$2.findIndex(((e$3) => e$3.startsWith("id=")));
						return -1 !== r$1 && (s$2 = i$2[r$1].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({
							id: s$2,
							uri: t$2
						}), this._curAttrData.updateExtended(), !0;
					}
					_finishHyperlink() {
						return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), !0;
					}
					_setOrReportSpecialColor(e$2, t$2) {
						const i$2 = e$2.split(";");
						for (let e$3 = 0; e$3 < i$2.length && !(t$2 >= this._specialColors.length); ++e$3, ++t$2) if ("?" === i$2[e$3]) this._onColor.fire([{
							type: 0,
							index: this._specialColors[t$2]
						}]);
						else {
							const s$2 = (0, S.parseColor)(i$2[e$3]);
							s$2 && this._onColor.fire([{
								type: 1,
								index: this._specialColors[t$2],
								color: s$2
							}]);
						}
						return !0;
					}
					setOrReportFgColor(e$2) {
						return this._setOrReportSpecialColor(e$2, 0);
					}
					setOrReportBgColor(e$2) {
						return this._setOrReportSpecialColor(e$2, 1);
					}
					setOrReportCursorColor(e$2) {
						return this._setOrReportSpecialColor(e$2, 2);
					}
					restoreIndexedColor(e$2) {
						if (!e$2) return this._onColor.fire([{ type: 2 }]), !0;
						const t$2 = [], i$2 = e$2.split(";");
						for (let e$3 = 0; e$3 < i$2.length; ++e$3) if (/^\d+$/.exec(i$2[e$3])) {
							const s$2 = parseInt(i$2[e$3]);
							D(s$2) && t$2.push({
								type: 2,
								index: s$2
							});
						}
						return t$2.length && this._onColor.fire(t$2), !0;
					}
					restoreFgColor(e$2) {
						return this._onColor.fire([{
							type: 2,
							index: 256
						}]), !0;
					}
					restoreBgColor(e$2) {
						return this._onColor.fire([{
							type: 2,
							index: 257
						}]), !0;
					}
					restoreCursorColor(e$2) {
						return this._onColor.fire([{
							type: 2,
							index: 258
						}]), !0;
					}
					nextLine() {
						return this._activeBuffer.x = 0, this.index(), !0;
					}
					keypadApplicationMode() {
						return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire(), !0;
					}
					keypadNumericMode() {
						return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire(), !0;
					}
					selectDefaultCharset() {
						return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), !0;
					}
					selectCharset(e$2) {
						return 2 !== e$2.length ? (this.selectDefaultCharset(), !0) : ("/" === e$2[0] || this._charsetService.setgCharset(C[e$2[0]], o.CHARSETS[e$2[1]] || o.DEFAULT_CHARSET), !0);
					}
					index() {
						return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), !0;
					}
					tabSet() {
						return this._activeBuffer.tabs[this._activeBuffer.x] = !0, !0;
					}
					reverseIndex() {
						if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
							const e$2 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
							this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e$2, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
						} else this._activeBuffer.y--, this._restrictCursor();
						return !0;
					}
					fullReset() {
						return this._parser.reset(), this._onRequestReset.fire(), !0;
					}
					reset() {
						this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone();
					}
					_eraseAttrData() {
						return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
					}
					setgLevel(e$2) {
						return this._charsetService.setgLevel(e$2), !0;
					}
					screenAlignmentPattern() {
						const e$2 = new u.CellData();
						e$2.content = 1 << 22 | "E".charCodeAt(0), e$2.fg = this._curAttrData.fg, e$2.bg = this._curAttrData.bg, this._setCursor(0, 0);
						for (let t$2 = 0; t$2 < this._bufferService.rows; ++t$2) {
							const i$2 = this._activeBuffer.ybase + this._activeBuffer.y + t$2, s$2 = this._activeBuffer.lines.get(i$2);
							s$2 && (s$2.fill(e$2), s$2.isWrapped = !1);
						}
						return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), !0;
					}
					requestStatusString(e$2, t$2) {
						const i$2 = this._bufferService.buffer, s$2 = this._optionsService.rawOptions;
						return ((e$3) => (this._coreService.triggerDataEvent(`${n.C0.ESC}${e$3}${n.C0.ESC}\\`), !0))("\"q" === e$2 ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : "\"p" === e$2 ? "P1$r61;1\"p" : "r" === e$2 ? `P1$r${i$2.scrollTop + 1};${i$2.scrollBottom + 1}r` : "m" === e$2 ? "P1$r0m" : " q" === e$2 ? `P1$r${{
							block: 2,
							underline: 4,
							bar: 6
						}[s$2.cursorStyle] - (s$2.cursorBlink ? 1 : 0)} q` : "P0$r");
					}
					markRangeDirty(e$2, t$2) {
						this._dirtyRowTracker.markRangeDirty(e$2, t$2);
					}
				}
				t$1.InputHandler = k;
				let L = class {
					constructor(e$2) {
						this._bufferService = e$2, this.clearRange();
					}
					clearRange() {
						this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
					}
					markDirty(e$2) {
						e$2 < this.start ? this.start = e$2 : e$2 > this.end && (this.end = e$2);
					}
					markRangeDirty(e$2, t$2) {
						e$2 > t$2 && (E = e$2, e$2 = t$2, t$2 = E), e$2 < this.start && (this.start = e$2), t$2 > this.end && (this.end = t$2);
					}
					markAllDirty() {
						this.markRangeDirty(0, this._bufferService.rows - 1);
					}
				};
				function D(e$2) {
					return 0 <= e$2 && e$2 < 256;
				}
				L = s$1([r(0, v.IBufferService)], L);
			},
			844: (e$1, t$1) => {
				function i$1(e$2) {
					for (const t$2 of e$2) t$2.dispose();
					e$2.length = 0;
				}
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.getDisposeArrayDisposable = t$1.disposeArray = t$1.toDisposable = t$1.MutableDisposable = t$1.Disposable = void 0, t$1.Disposable = class {
					constructor() {
						this._disposables = [], this._isDisposed = !1;
					}
					dispose() {
						this._isDisposed = !0;
						for (const e$2 of this._disposables) e$2.dispose();
						this._disposables.length = 0;
					}
					register(e$2) {
						return this._disposables.push(e$2), e$2;
					}
					unregister(e$2) {
						const t$2 = this._disposables.indexOf(e$2);
						-1 !== t$2 && this._disposables.splice(t$2, 1);
					}
				}, t$1.MutableDisposable = class {
					constructor() {
						this._isDisposed = !1;
					}
					get value() {
						return this._isDisposed ? void 0 : this._value;
					}
					set value(e$2) {
						this._isDisposed || e$2 === this._value || (this._value?.dispose(), this._value = e$2);
					}
					clear() {
						this.value = void 0;
					}
					dispose() {
						this._isDisposed = !0, this._value?.dispose(), this._value = void 0;
					}
				}, t$1.toDisposable = function(e$2) {
					return { dispose: e$2 };
				}, t$1.disposeArray = i$1, t$1.getDisposeArrayDisposable = function(e$2) {
					return { dispose: () => i$1(e$2) };
				};
			},
			1505: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.FourKeyMap = t$1.TwoKeyMap = void 0;
				class i$1 {
					constructor() {
						this._data = {};
					}
					set(e$2, t$2, i$2) {
						this._data[e$2] || (this._data[e$2] = {}), this._data[e$2][t$2] = i$2;
					}
					get(e$2, t$2) {
						return this._data[e$2] ? this._data[e$2][t$2] : void 0;
					}
					clear() {
						this._data = {};
					}
				}
				t$1.TwoKeyMap = i$1, t$1.FourKeyMap = class {
					constructor() {
						this._data = new i$1();
					}
					set(e$2, t$2, s$1, r, n) {
						this._data.get(e$2, t$2) || this._data.set(e$2, t$2, new i$1()), this._data.get(e$2, t$2).set(s$1, r, n);
					}
					get(e$2, t$2, i$2, s$1) {
						return this._data.get(e$2, t$2)?.get(i$2, s$1);
					}
					clear() {
						this._data.clear();
					}
				};
			},
			6114: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.isChromeOS = t$1.isLinux = t$1.isWindows = t$1.isIphone = t$1.isIpad = t$1.isMac = t$1.getSafariVersion = t$1.isSafari = t$1.isLegacyEdge = t$1.isFirefox = t$1.isNode = void 0, t$1.isNode = "undefined" != typeof process && "title" in process;
				const i$1 = t$1.isNode ? "node" : navigator.userAgent, s$1 = t$1.isNode ? "node" : navigator.platform;
				t$1.isFirefox = i$1.includes("Firefox"), t$1.isLegacyEdge = i$1.includes("Edge"), t$1.isSafari = /^((?!chrome|android).)*safari/i.test(i$1), t$1.getSafariVersion = function() {
					if (!t$1.isSafari) return 0;
					const e$2 = i$1.match(/Version\/(\d+)/);
					return null === e$2 || e$2.length < 2 ? 0 : parseInt(e$2[1]);
				}, t$1.isMac = [
					"Macintosh",
					"MacIntel",
					"MacPPC",
					"Mac68K"
				].includes(s$1), t$1.isIpad = "iPad" === s$1, t$1.isIphone = "iPhone" === s$1, t$1.isWindows = [
					"Windows",
					"Win16",
					"Win32",
					"WinCE"
				].includes(s$1), t$1.isLinux = s$1.indexOf("Linux") >= 0, t$1.isChromeOS = /\bCrOS\b/.test(i$1);
			},
			6106: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.SortedList = void 0;
				let i$1 = 0;
				t$1.SortedList = class {
					constructor(e$2) {
						this._getKey = e$2, this._array = [];
					}
					clear() {
						this._array.length = 0;
					}
					insert(e$2) {
						0 !== this._array.length ? (i$1 = this._search(this._getKey(e$2)), this._array.splice(i$1, 0, e$2)) : this._array.push(e$2);
					}
					delete(e$2) {
						if (0 === this._array.length) return !1;
						const t$2 = this._getKey(e$2);
						if (void 0 === t$2) return !1;
						if (i$1 = this._search(t$2), -1 === i$1) return !1;
						if (this._getKey(this._array[i$1]) !== t$2) return !1;
						do
							if (this._array[i$1] === e$2) return this._array.splice(i$1, 1), !0;
						while (++i$1 < this._array.length && this._getKey(this._array[i$1]) === t$2);
						return !1;
					}
					*getKeyIterator(e$2) {
						if (0 !== this._array.length && (i$1 = this._search(e$2), !(i$1 < 0 || i$1 >= this._array.length) && this._getKey(this._array[i$1]) === e$2)) do
							yield this._array[i$1];
						while (++i$1 < this._array.length && this._getKey(this._array[i$1]) === e$2);
					}
					forEachByKey(e$2, t$2) {
						if (0 !== this._array.length && (i$1 = this._search(e$2), !(i$1 < 0 || i$1 >= this._array.length) && this._getKey(this._array[i$1]) === e$2)) do
							t$2(this._array[i$1]);
						while (++i$1 < this._array.length && this._getKey(this._array[i$1]) === e$2);
					}
					values() {
						return [...this._array].values();
					}
					_search(e$2) {
						let t$2 = 0, i$2 = this._array.length - 1;
						for (; i$2 >= t$2;) {
							let s$1 = t$2 + i$2 >> 1;
							const r = this._getKey(this._array[s$1]);
							if (r > e$2) i$2 = s$1 - 1;
							else {
								if (!(r < e$2)) {
									for (; s$1 > 0 && this._getKey(this._array[s$1 - 1]) === e$2;) s$1--;
									return s$1;
								}
								t$2 = s$1 + 1;
							}
						}
						return t$2;
					}
				};
			},
			7226: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DebouncedIdleTask = t$1.IdleTaskQueue = t$1.PriorityTaskQueue = void 0;
				const s$1 = i$1(6114);
				class r {
					constructor() {
						this._tasks = [], this._i = 0;
					}
					enqueue(e$2) {
						this._tasks.push(e$2), this._start();
					}
					flush() {
						for (; this._i < this._tasks.length;) this._tasks[this._i]() || this._i++;
						this.clear();
					}
					clear() {
						this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
					}
					_start() {
						this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
					}
					_process(e$2) {
						this._idleCallback = void 0;
						let t$2 = 0, i$2 = 0, s$2 = e$2.timeRemaining(), r$1 = 0;
						for (; this._i < this._tasks.length;) {
							if (t$2 = Date.now(), this._tasks[this._i]() || this._i++, t$2 = Math.max(1, Date.now() - t$2), i$2 = Math.max(t$2, i$2), r$1 = e$2.timeRemaining(), 1.5 * i$2 > r$1) return s$2 - t$2 < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s$2 - t$2))}ms`), void this._start();
							s$2 = r$1;
						}
						this.clear();
					}
				}
				class n extends r {
					_requestCallback(e$2) {
						return setTimeout((() => e$2(this._createDeadline(16))));
					}
					_cancelCallback(e$2) {
						clearTimeout(e$2);
					}
					_createDeadline(e$2) {
						const t$2 = Date.now() + e$2;
						return { timeRemaining: () => Math.max(0, t$2 - Date.now()) };
					}
				}
				t$1.PriorityTaskQueue = n, t$1.IdleTaskQueue = !s$1.isNode && "requestIdleCallback" in window ? class extends r {
					_requestCallback(e$2) {
						return requestIdleCallback(e$2);
					}
					_cancelCallback(e$2) {
						cancelIdleCallback(e$2);
					}
				} : n, t$1.DebouncedIdleTask = class {
					constructor() {
						this._queue = new t$1.IdleTaskQueue();
					}
					set(e$2) {
						this._queue.clear(), this._queue.enqueue(e$2);
					}
					flush() {
						this._queue.flush();
					}
				};
			},
			9282: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.updateWindowsModeWrappedState = void 0;
				const s$1 = i$1(643);
				t$1.updateWindowsModeWrappedState = function(e$2) {
					const i$2 = e$2.buffer.lines.get(e$2.buffer.ybase + e$2.buffer.y - 1)?.get(e$2.cols - 1), r = e$2.buffer.lines.get(e$2.buffer.ybase + e$2.buffer.y);
					r && i$2 && (r.isWrapped = i$2[s$1.CHAR_DATA_CODE_INDEX] !== s$1.NULL_CELL_CODE && i$2[s$1.CHAR_DATA_CODE_INDEX] !== s$1.WHITESPACE_CELL_CODE);
				};
			},
			3734: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ExtendedAttrs = t$1.AttributeData = void 0;
				class i$1 {
					constructor() {
						this.fg = 0, this.bg = 0, this.extended = new s$1();
					}
					static toColorRGB(e$2) {
						return [
							e$2 >>> 16 & 255,
							e$2 >>> 8 & 255,
							255 & e$2
						];
					}
					static fromColorRGB(e$2) {
						return (255 & e$2[0]) << 16 | (255 & e$2[1]) << 8 | 255 & e$2[2];
					}
					clone() {
						const e$2 = new i$1();
						return e$2.fg = this.fg, e$2.bg = this.bg, e$2.extended = this.extended.clone(), e$2;
					}
					isInverse() {
						return 67108864 & this.fg;
					}
					isBold() {
						return 134217728 & this.fg;
					}
					isUnderline() {
						return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
					}
					isBlink() {
						return 536870912 & this.fg;
					}
					isInvisible() {
						return 1073741824 & this.fg;
					}
					isItalic() {
						return 67108864 & this.bg;
					}
					isDim() {
						return 134217728 & this.bg;
					}
					isStrikethrough() {
						return 2147483648 & this.fg;
					}
					isProtected() {
						return 536870912 & this.bg;
					}
					isOverline() {
						return 1073741824 & this.bg;
					}
					getFgColorMode() {
						return 50331648 & this.fg;
					}
					getBgColorMode() {
						return 50331648 & this.bg;
					}
					isFgRGB() {
						return 50331648 == (50331648 & this.fg);
					}
					isBgRGB() {
						return 50331648 == (50331648 & this.bg);
					}
					isFgPalette() {
						return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
					}
					isBgPalette() {
						return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
					}
					isFgDefault() {
						return 0 == (50331648 & this.fg);
					}
					isBgDefault() {
						return 0 == (50331648 & this.bg);
					}
					isAttributeDefault() {
						return 0 === this.fg && 0 === this.bg;
					}
					getFgColor() {
						switch (50331648 & this.fg) {
							case 16777216:
							case 33554432: return 255 & this.fg;
							case 50331648: return 16777215 & this.fg;
							default: return -1;
						}
					}
					getBgColor() {
						switch (50331648 & this.bg) {
							case 16777216:
							case 33554432: return 255 & this.bg;
							case 50331648: return 16777215 & this.bg;
							default: return -1;
						}
					}
					hasExtendedAttrs() {
						return 268435456 & this.bg;
					}
					updateExtended() {
						this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
					}
					getUnderlineColor() {
						if (268435456 & this.bg && ~this.extended.underlineColor) switch (50331648 & this.extended.underlineColor) {
							case 16777216:
							case 33554432: return 255 & this.extended.underlineColor;
							case 50331648: return 16777215 & this.extended.underlineColor;
							default: return this.getFgColor();
						}
						return this.getFgColor();
					}
					getUnderlineColorMode() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
					}
					isUnderlineColorRGB() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB();
					}
					isUnderlineColorPalette() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
					}
					isUnderlineColorDefault() {
						return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault();
					}
					getUnderlineStyle() {
						return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
					}
					getUnderlineVariantOffset() {
						return this.extended.underlineVariantOffset;
					}
				}
				t$1.AttributeData = i$1;
				class s$1 {
					get ext() {
						return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
					}
					set ext(e$2) {
						this._ext = e$2;
					}
					get underlineStyle() {
						return this._urlId ? 5 : (469762048 & this._ext) >> 26;
					}
					set underlineStyle(e$2) {
						this._ext &= -469762049, this._ext |= e$2 << 26 & 469762048;
					}
					get underlineColor() {
						return 67108863 & this._ext;
					}
					set underlineColor(e$2) {
						this._ext &= -67108864, this._ext |= 67108863 & e$2;
					}
					get urlId() {
						return this._urlId;
					}
					set urlId(e$2) {
						this._urlId = e$2;
					}
					get underlineVariantOffset() {
						const e$2 = (3758096384 & this._ext) >> 29;
						return e$2 < 0 ? 4294967288 ^ e$2 : e$2;
					}
					set underlineVariantOffset(e$2) {
						this._ext &= 536870911, this._ext |= e$2 << 29 & 3758096384;
					}
					constructor(e$2 = 0, t$2 = 0) {
						this._ext = 0, this._urlId = 0, this._ext = e$2, this._urlId = t$2;
					}
					clone() {
						return new s$1(this._ext, this._urlId);
					}
					isEmpty() {
						return 0 === this.underlineStyle && 0 === this._urlId;
					}
				}
				t$1.ExtendedAttrs = s$1;
			},
			9092: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Buffer = t$1.MAX_BUFFER_SIZE = void 0;
				const s$1 = i$1(6349), r = i$1(7226), n = i$1(3734), o = i$1(8437), a = i$1(4634), h = i$1(511), c$1 = i$1(643), l = i$1(4863), d = i$1(7116);
				t$1.MAX_BUFFER_SIZE = 4294967295, t$1.Buffer = class {
					constructor(e$2, t$2, i$2) {
						this._hasScrollback = e$2, this._optionsService = t$2, this._bufferService = i$2, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = o.DEFAULT_ATTR_DATA.clone(), this.savedCharset = d.DEFAULT_CHARSET, this.markers = [], this._nullCell = h.CellData.fromCharData([
							0,
							c$1.NULL_CELL_CHAR,
							c$1.NULL_CELL_WIDTH,
							c$1.NULL_CELL_CODE
						]), this._whitespaceCell = h.CellData.fromCharData([
							0,
							c$1.WHITESPACE_CELL_CHAR,
							c$1.WHITESPACE_CELL_WIDTH,
							c$1.WHITESPACE_CELL_CODE
						]), this._isClearing = !1, this._memoryCleanupQueue = new r.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s$1.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
					}
					getNullCell(e$2) {
						return e$2 ? (this._nullCell.fg = e$2.fg, this._nullCell.bg = e$2.bg, this._nullCell.extended = e$2.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n.ExtendedAttrs()), this._nullCell;
					}
					getWhitespaceCell(e$2) {
						return e$2 ? (this._whitespaceCell.fg = e$2.fg, this._whitespaceCell.bg = e$2.bg, this._whitespaceCell.extended = e$2.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n.ExtendedAttrs()), this._whitespaceCell;
					}
					getBlankLine(e$2, t$2) {
						return new o.BufferLine(this._bufferService.cols, this.getNullCell(e$2), t$2);
					}
					get hasScrollback() {
						return this._hasScrollback && this.lines.maxLength > this._rows;
					}
					get isCursorInViewport() {
						const e$2 = this.ybase + this.y - this.ydisp;
						return e$2 >= 0 && e$2 < this._rows;
					}
					_getCorrectBufferLength(e$2) {
						if (!this._hasScrollback) return e$2;
						const i$2 = e$2 + this._optionsService.rawOptions.scrollback;
						return i$2 > t$1.MAX_BUFFER_SIZE ? t$1.MAX_BUFFER_SIZE : i$2;
					}
					fillViewportRows(e$2) {
						if (0 === this.lines.length) {
							void 0 === e$2 && (e$2 = o.DEFAULT_ATTR_DATA);
							let t$2 = this._rows;
							for (; t$2--;) this.lines.push(this.getBlankLine(e$2));
						}
					}
					clear() {
						this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s$1.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
					}
					resize(e$2, t$2) {
						const i$2 = this.getNullCell(o.DEFAULT_ATTR_DATA);
						let s$2 = 0;
						const r$1 = this._getCorrectBufferLength(t$2);
						if (r$1 > this.lines.maxLength && (this.lines.maxLength = r$1), this.lines.length > 0) {
							if (this._cols < e$2) for (let t$3 = 0; t$3 < this.lines.length; t$3++) s$2 += +this.lines.get(t$3).resize(e$2, i$2);
							let n$1 = 0;
							if (this._rows < t$2) for (let s$3 = this._rows; s$3 < t$2; s$3++) this.lines.length < t$2 + this.ybase && (this._optionsService.rawOptions.windowsMode || void 0 !== this._optionsService.rawOptions.windowsPty.backend || void 0 !== this._optionsService.rawOptions.windowsPty.buildNumber ? this.lines.push(new o.BufferLine(e$2, i$2)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n$1 + 1 ? (this.ybase--, n$1++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new o.BufferLine(e$2, i$2)));
							else for (let e$3 = this._rows; e$3 > t$2; e$3--) this.lines.length > t$2 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
							if (r$1 < this.lines.maxLength) {
								const e$3 = this.lines.length - r$1;
								e$3 > 0 && (this.lines.trimStart(e$3), this.ybase = Math.max(this.ybase - e$3, 0), this.ydisp = Math.max(this.ydisp - e$3, 0), this.savedY = Math.max(this.savedY - e$3, 0)), this.lines.maxLength = r$1;
							}
							this.x = Math.min(this.x, e$2 - 1), this.y = Math.min(this.y, t$2 - 1), n$1 && (this.y += n$1), this.savedX = Math.min(this.savedX, e$2 - 1), this.scrollTop = 0;
						}
						if (this.scrollBottom = t$2 - 1, this._isReflowEnabled && (this._reflow(e$2, t$2), this._cols > e$2)) for (let t$3 = 0; t$3 < this.lines.length; t$3++) s$2 += +this.lines.get(t$3).resize(e$2, i$2);
						this._cols = e$2, this._rows = t$2, this._memoryCleanupQueue.clear(), s$2 > .1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue((() => this._batchedMemoryCleanup())));
					}
					_batchedMemoryCleanup() {
						let e$2 = !0;
						this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e$2 = !1);
						let t$2 = 0;
						for (; this._memoryCleanupPosition < this.lines.length;) if (t$2 += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t$2 > 100) return !0;
						return e$2;
					}
					get _isReflowEnabled() {
						const e$2 = this._optionsService.rawOptions.windowsPty;
						return e$2 && e$2.buildNumber ? this._hasScrollback && "conpty" === e$2.backend && e$2.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
					}
					_reflow(e$2, t$2) {
						this._cols !== e$2 && (e$2 > this._cols ? this._reflowLarger(e$2, t$2) : this._reflowSmaller(e$2, t$2));
					}
					_reflowLarger(e$2, t$2) {
						const i$2 = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e$2, this.ybase + this.y, this.getNullCell(o.DEFAULT_ATTR_DATA));
						if (i$2.length > 0) {
							const s$2 = (0, a.reflowLargerCreateNewLayout)(this.lines, i$2);
							(0, a.reflowLargerApplyNewLayout)(this.lines, s$2.layout), this._reflowLargerAdjustViewport(e$2, t$2, s$2.countRemoved);
						}
					}
					_reflowLargerAdjustViewport(e$2, t$2, i$2) {
						const s$2 = this.getNullCell(o.DEFAULT_ATTR_DATA);
						let r$1 = i$2;
						for (; r$1-- > 0;) 0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t$2 && this.lines.push(new o.BufferLine(e$2, s$2))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
						this.savedY = Math.max(this.savedY - i$2, 0);
					}
					_reflowSmaller(e$2, t$2) {
						const i$2 = this.getNullCell(o.DEFAULT_ATTR_DATA), s$2 = [];
						let r$1 = 0;
						for (let n$1 = this.lines.length - 1; n$1 >= 0; n$1--) {
							let h$1 = this.lines.get(n$1);
							if (!h$1 || !h$1.isWrapped && h$1.getTrimmedLength() <= e$2) continue;
							const c$2 = [h$1];
							for (; h$1.isWrapped && n$1 > 0;) h$1 = this.lines.get(--n$1), c$2.unshift(h$1);
							const l$1 = this.ybase + this.y;
							if (l$1 >= n$1 && l$1 < n$1 + c$2.length) continue;
							const d$1 = c$2[c$2.length - 1].getTrimmedLength(), _ = (0, a.reflowSmallerGetNewLineLengths)(c$2, this._cols, e$2), u = _.length - c$2.length;
							let f;
							f = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u) : Math.max(0, this.lines.length - this.lines.maxLength + u);
							const v = [];
							for (let e$3 = 0; e$3 < u; e$3++) {
								const e$4 = this.getBlankLine(o.DEFAULT_ATTR_DATA, !0);
								v.push(e$4);
							}
							v.length > 0 && (s$2.push({
								start: n$1 + c$2.length + r$1,
								newLines: v
							}), r$1 += v.length), c$2.push(...v);
							let p = _.length - 1, g = _[p];
							0 === g && (p--, g = _[p]);
							let m = c$2.length - u - 1, S = d$1;
							for (; m >= 0;) {
								const e$3 = Math.min(S, g);
								if (void 0 === c$2[p]) break;
								if (c$2[p].copyCellsFrom(c$2[m], S - e$3, g - e$3, e$3, !0), g -= e$3, 0 === g && (p--, g = _[p]), S -= e$3, 0 === S) {
									m--;
									const e$4 = Math.max(m, 0);
									S = (0, a.getWrappedLineTrimmedLength)(c$2, e$4, this._cols);
								}
							}
							for (let t$3 = 0; t$3 < c$2.length; t$3++) _[t$3] < e$2 && c$2[t$3].setCell(_[t$3], i$2);
							let C = u - f;
							for (; C-- > 0;) 0 === this.ybase ? this.y < t$2 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + r$1) - t$2 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
							this.savedY = Math.min(this.savedY + u, this.ybase + t$2 - 1);
						}
						if (s$2.length > 0) {
							const e$3 = [], t$3 = [];
							for (let e$4 = 0; e$4 < this.lines.length; e$4++) t$3.push(this.lines.get(e$4));
							const i$3 = this.lines.length;
							let n$1 = i$3 - 1, o$1 = 0, a$1 = s$2[o$1];
							this.lines.length = Math.min(this.lines.maxLength, this.lines.length + r$1);
							let h$1 = 0;
							for (let c$3 = Math.min(this.lines.maxLength - 1, i$3 + r$1 - 1); c$3 >= 0; c$3--) if (a$1 && a$1.start > n$1 + h$1) {
								for (let e$4 = a$1.newLines.length - 1; e$4 >= 0; e$4--) this.lines.set(c$3--, a$1.newLines[e$4]);
								c$3++, e$3.push({
									index: n$1 + 1,
									amount: a$1.newLines.length
								}), h$1 += a$1.newLines.length, a$1 = s$2[++o$1];
							} else this.lines.set(c$3, t$3[n$1--]);
							let c$2 = 0;
							for (let t$4 = e$3.length - 1; t$4 >= 0; t$4--) e$3[t$4].index += c$2, this.lines.onInsertEmitter.fire(e$3[t$4]), c$2 += e$3[t$4].amount;
							const l$1 = Math.max(0, i$3 + r$1 - this.lines.maxLength);
							l$1 > 0 && this.lines.onTrimEmitter.fire(l$1);
						}
					}
					translateBufferLineToString(e$2, t$2, i$2 = 0, s$2) {
						const r$1 = this.lines.get(e$2);
						return r$1 ? r$1.translateToString(t$2, i$2, s$2) : "";
					}
					getWrappedRangeForLine(e$2) {
						let t$2 = e$2, i$2 = e$2;
						for (; t$2 > 0 && this.lines.get(t$2).isWrapped;) t$2--;
						for (; i$2 + 1 < this.lines.length && this.lines.get(i$2 + 1).isWrapped;) i$2++;
						return {
							first: t$2,
							last: i$2
						};
					}
					setupTabStops(e$2) {
						for (null != e$2 ? this.tabs[e$2] || (e$2 = this.prevStop(e$2)) : (this.tabs = {}, e$2 = 0); e$2 < this._cols; e$2 += this._optionsService.rawOptions.tabStopWidth) this.tabs[e$2] = !0;
					}
					prevStop(e$2) {
						for (e$2 ??= this.x; !this.tabs[--e$2] && e$2 > 0;);
						return e$2 >= this._cols ? this._cols - 1 : e$2 < 0 ? 0 : e$2;
					}
					nextStop(e$2) {
						for (e$2 ??= this.x; !this.tabs[++e$2] && e$2 < this._cols;);
						return e$2 >= this._cols ? this._cols - 1 : e$2 < 0 ? 0 : e$2;
					}
					clearMarkers(e$2) {
						this._isClearing = !0;
						for (let t$2 = 0; t$2 < this.markers.length; t$2++) this.markers[t$2].line === e$2 && (this.markers[t$2].dispose(), this.markers.splice(t$2--, 1));
						this._isClearing = !1;
					}
					clearAllMarkers() {
						this._isClearing = !0;
						for (let e$2 = 0; e$2 < this.markers.length; e$2++) this.markers[e$2].dispose(), this.markers.splice(e$2--, 1);
						this._isClearing = !1;
					}
					addMarker(e$2) {
						const t$2 = new l.Marker(e$2);
						return this.markers.push(t$2), t$2.register(this.lines.onTrim(((e$3) => {
							t$2.line -= e$3, t$2.line < 0 && t$2.dispose();
						}))), t$2.register(this.lines.onInsert(((e$3) => {
							t$2.line >= e$3.index && (t$2.line += e$3.amount);
						}))), t$2.register(this.lines.onDelete(((e$3) => {
							t$2.line >= e$3.index && t$2.line < e$3.index + e$3.amount && t$2.dispose(), t$2.line > e$3.index && (t$2.line -= e$3.amount);
						}))), t$2.register(t$2.onDispose((() => this._removeMarker(t$2)))), t$2;
					}
					_removeMarker(e$2) {
						this._isClearing || this.markers.splice(this.markers.indexOf(e$2), 1);
					}
				};
			},
			8437: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferLine = t$1.DEFAULT_ATTR_DATA = void 0;
				const s$1 = i$1(3734), r = i$1(511), n = i$1(643), o = i$1(482);
				t$1.DEFAULT_ATTR_DATA = Object.freeze(new s$1.AttributeData());
				let a = 0;
				class h {
					constructor(e$2, t$2, i$2 = !1) {
						this.isWrapped = i$2, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e$2);
						const s$2 = t$2 || r.CellData.fromCharData([
							0,
							n.NULL_CELL_CHAR,
							n.NULL_CELL_WIDTH,
							n.NULL_CELL_CODE
						]);
						for (let t$3 = 0; t$3 < e$2; ++t$3) this.setCell(t$3, s$2);
						this.length = e$2;
					}
					get(e$2) {
						const t$2 = this._data[3 * e$2 + 0], i$2 = 2097151 & t$2;
						return [
							this._data[3 * e$2 + 1],
							2097152 & t$2 ? this._combined[e$2] : i$2 ? (0, o.stringFromCodePoint)(i$2) : "",
							t$2 >> 22,
							2097152 & t$2 ? this._combined[e$2].charCodeAt(this._combined[e$2].length - 1) : i$2
						];
					}
					set(e$2, t$2) {
						this._data[3 * e$2 + 1] = t$2[n.CHAR_DATA_ATTR_INDEX], t$2[n.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e$2] = t$2[1], this._data[3 * e$2 + 0] = 2097152 | e$2 | t$2[n.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e$2 + 0] = t$2[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t$2[n.CHAR_DATA_WIDTH_INDEX] << 22;
					}
					getWidth(e$2) {
						return this._data[3 * e$2 + 0] >> 22;
					}
					hasWidth(e$2) {
						return 12582912 & this._data[3 * e$2 + 0];
					}
					getFg(e$2) {
						return this._data[3 * e$2 + 1];
					}
					getBg(e$2) {
						return this._data[3 * e$2 + 2];
					}
					hasContent(e$2) {
						return 4194303 & this._data[3 * e$2 + 0];
					}
					getCodePoint(e$2) {
						const t$2 = this._data[3 * e$2 + 0];
						return 2097152 & t$2 ? this._combined[e$2].charCodeAt(this._combined[e$2].length - 1) : 2097151 & t$2;
					}
					isCombined(e$2) {
						return 2097152 & this._data[3 * e$2 + 0];
					}
					getString(e$2) {
						const t$2 = this._data[3 * e$2 + 0];
						return 2097152 & t$2 ? this._combined[e$2] : 2097151 & t$2 ? (0, o.stringFromCodePoint)(2097151 & t$2) : "";
					}
					isProtected(e$2) {
						return 536870912 & this._data[3 * e$2 + 2];
					}
					loadCell(e$2, t$2) {
						return a = 3 * e$2, t$2.content = this._data[a + 0], t$2.fg = this._data[a + 1], t$2.bg = this._data[a + 2], 2097152 & t$2.content && (t$2.combinedData = this._combined[e$2]), 268435456 & t$2.bg && (t$2.extended = this._extendedAttrs[e$2]), t$2;
					}
					setCell(e$2, t$2) {
						2097152 & t$2.content && (this._combined[e$2] = t$2.combinedData), 268435456 & t$2.bg && (this._extendedAttrs[e$2] = t$2.extended), this._data[3 * e$2 + 0] = t$2.content, this._data[3 * e$2 + 1] = t$2.fg, this._data[3 * e$2 + 2] = t$2.bg;
					}
					setCellFromCodepoint(e$2, t$2, i$2, s$2) {
						268435456 & s$2.bg && (this._extendedAttrs[e$2] = s$2.extended), this._data[3 * e$2 + 0] = t$2 | i$2 << 22, this._data[3 * e$2 + 1] = s$2.fg, this._data[3 * e$2 + 2] = s$2.bg;
					}
					addCodepointToCell(e$2, t$2, i$2) {
						let s$2 = this._data[3 * e$2 + 0];
						2097152 & s$2 ? this._combined[e$2] += (0, o.stringFromCodePoint)(t$2) : 2097151 & s$2 ? (this._combined[e$2] = (0, o.stringFromCodePoint)(2097151 & s$2) + (0, o.stringFromCodePoint)(t$2), s$2 &= -2097152, s$2 |= 2097152) : s$2 = t$2 | 1 << 22, i$2 && (s$2 &= -12582913, s$2 |= i$2 << 22), this._data[3 * e$2 + 0] = s$2;
					}
					insertCells(e$2, t$2, i$2) {
						if ((e$2 %= this.length) && 2 === this.getWidth(e$2 - 1) && this.setCellFromCodepoint(e$2 - 1, 0, 1, i$2), t$2 < this.length - e$2) {
							const s$2 = new r.CellData();
							for (let i$3 = this.length - e$2 - t$2 - 1; i$3 >= 0; --i$3) this.setCell(e$2 + t$2 + i$3, this.loadCell(e$2 + i$3, s$2));
							for (let s$3 = 0; s$3 < t$2; ++s$3) this.setCell(e$2 + s$3, i$2);
						} else for (let t$3 = e$2; t$3 < this.length; ++t$3) this.setCell(t$3, i$2);
						2 === this.getWidth(this.length - 1) && this.setCellFromCodepoint(this.length - 1, 0, 1, i$2);
					}
					deleteCells(e$2, t$2, i$2) {
						if (e$2 %= this.length, t$2 < this.length - e$2) {
							const s$2 = new r.CellData();
							for (let i$3 = 0; i$3 < this.length - e$2 - t$2; ++i$3) this.setCell(e$2 + i$3, this.loadCell(e$2 + t$2 + i$3, s$2));
							for (let e$3 = this.length - t$2; e$3 < this.length; ++e$3) this.setCell(e$3, i$2);
						} else for (let t$3 = e$2; t$3 < this.length; ++t$3) this.setCell(t$3, i$2);
						e$2 && 2 === this.getWidth(e$2 - 1) && this.setCellFromCodepoint(e$2 - 1, 0, 1, i$2), 0 !== this.getWidth(e$2) || this.hasContent(e$2) || this.setCellFromCodepoint(e$2, 0, 1, i$2);
					}
					replaceCells(e$2, t$2, i$2, s$2 = !1) {
						if (s$2) for (e$2 && 2 === this.getWidth(e$2 - 1) && !this.isProtected(e$2 - 1) && this.setCellFromCodepoint(e$2 - 1, 0, 1, i$2), t$2 < this.length && 2 === this.getWidth(t$2 - 1) && !this.isProtected(t$2) && this.setCellFromCodepoint(t$2, 0, 1, i$2); e$2 < t$2 && e$2 < this.length;) this.isProtected(e$2) || this.setCell(e$2, i$2), e$2++;
						else for (e$2 && 2 === this.getWidth(e$2 - 1) && this.setCellFromCodepoint(e$2 - 1, 0, 1, i$2), t$2 < this.length && 2 === this.getWidth(t$2 - 1) && this.setCellFromCodepoint(t$2, 0, 1, i$2); e$2 < t$2 && e$2 < this.length;) this.setCell(e$2++, i$2);
					}
					resize(e$2, t$2) {
						if (e$2 === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
						const i$2 = 3 * e$2;
						if (e$2 > this.length) {
							if (this._data.buffer.byteLength >= 4 * i$2) this._data = new Uint32Array(this._data.buffer, 0, i$2);
							else {
								const e$3 = new Uint32Array(i$2);
								e$3.set(this._data), this._data = e$3;
							}
							for (let i$3 = this.length; i$3 < e$2; ++i$3) this.setCell(i$3, t$2);
						} else {
							this._data = this._data.subarray(0, i$2);
							const t$3 = Object.keys(this._combined);
							for (let i$3 = 0; i$3 < t$3.length; i$3++) {
								const s$3 = parseInt(t$3[i$3], 10);
								s$3 >= e$2 && delete this._combined[s$3];
							}
							const s$2 = Object.keys(this._extendedAttrs);
							for (let t$4 = 0; t$4 < s$2.length; t$4++) {
								const i$3 = parseInt(s$2[t$4], 10);
								i$3 >= e$2 && delete this._extendedAttrs[i$3];
							}
						}
						return this.length = e$2, 4 * i$2 * 2 < this._data.buffer.byteLength;
					}
					cleanupMemory() {
						if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
							const e$2 = new Uint32Array(this._data.length);
							return e$2.set(this._data), this._data = e$2, 1;
						}
						return 0;
					}
					fill(e$2, t$2 = !1) {
						if (t$2) for (let t$3 = 0; t$3 < this.length; ++t$3) this.isProtected(t$3) || this.setCell(t$3, e$2);
						else {
							this._combined = {}, this._extendedAttrs = {};
							for (let t$3 = 0; t$3 < this.length; ++t$3) this.setCell(t$3, e$2);
						}
					}
					copyFrom(e$2) {
						this.length !== e$2.length ? this._data = new Uint32Array(e$2._data) : this._data.set(e$2._data), this.length = e$2.length, this._combined = {};
						for (const t$2 in e$2._combined) this._combined[t$2] = e$2._combined[t$2];
						this._extendedAttrs = {};
						for (const t$2 in e$2._extendedAttrs) this._extendedAttrs[t$2] = e$2._extendedAttrs[t$2];
						this.isWrapped = e$2.isWrapped;
					}
					clone() {
						const e$2 = new h(0);
						e$2._data = new Uint32Array(this._data), e$2.length = this.length;
						for (const t$2 in this._combined) e$2._combined[t$2] = this._combined[t$2];
						for (const t$2 in this._extendedAttrs) e$2._extendedAttrs[t$2] = this._extendedAttrs[t$2];
						return e$2.isWrapped = this.isWrapped, e$2;
					}
					getTrimmedLength() {
						for (let e$2 = this.length - 1; e$2 >= 0; --e$2) if (4194303 & this._data[3 * e$2 + 0]) return e$2 + (this._data[3 * e$2 + 0] >> 22);
						return 0;
					}
					getNoBgTrimmedLength() {
						for (let e$2 = this.length - 1; e$2 >= 0; --e$2) if (4194303 & this._data[3 * e$2 + 0] || 50331648 & this._data[3 * e$2 + 2]) return e$2 + (this._data[3 * e$2 + 0] >> 22);
						return 0;
					}
					copyCellsFrom(e$2, t$2, i$2, s$2, r$1) {
						const n$1 = e$2._data;
						if (r$1) for (let r$2 = s$2 - 1; r$2 >= 0; r$2--) {
							for (let e$3 = 0; e$3 < 3; e$3++) this._data[3 * (i$2 + r$2) + e$3] = n$1[3 * (t$2 + r$2) + e$3];
							268435456 & n$1[3 * (t$2 + r$2) + 2] && (this._extendedAttrs[i$2 + r$2] = e$2._extendedAttrs[t$2 + r$2]);
						}
						else for (let r$2 = 0; r$2 < s$2; r$2++) {
							for (let e$3 = 0; e$3 < 3; e$3++) this._data[3 * (i$2 + r$2) + e$3] = n$1[3 * (t$2 + r$2) + e$3];
							268435456 & n$1[3 * (t$2 + r$2) + 2] && (this._extendedAttrs[i$2 + r$2] = e$2._extendedAttrs[t$2 + r$2]);
						}
						const o$1 = Object.keys(e$2._combined);
						for (let s$3 = 0; s$3 < o$1.length; s$3++) {
							const r$2 = parseInt(o$1[s$3], 10);
							r$2 >= t$2 && (this._combined[r$2 - t$2 + i$2] = e$2._combined[r$2]);
						}
					}
					translateToString(e$2, t$2, i$2, s$2) {
						t$2 = t$2 ?? 0, i$2 = i$2 ?? this.length, e$2 && (i$2 = Math.min(i$2, this.getTrimmedLength())), s$2 && (s$2.length = 0);
						let r$1 = "";
						for (; t$2 < i$2;) {
							const e$3 = this._data[3 * t$2 + 0], i$3 = 2097151 & e$3, a$1 = 2097152 & e$3 ? this._combined[t$2] : i$3 ? (0, o.stringFromCodePoint)(i$3) : n.WHITESPACE_CELL_CHAR;
							if (r$1 += a$1, s$2) for (let e$4 = 0; e$4 < a$1.length; ++e$4) s$2.push(t$2);
							t$2 += e$3 >> 22 || 1;
						}
						return s$2 && s$2.push(t$2), r$1;
					}
				}
				t$1.BufferLine = h;
			},
			4841: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.getRangeLength = void 0, t$1.getRangeLength = function(e$2, t$2) {
					if (e$2.start.y > e$2.end.y) throw new Error(`Buffer range end (${e$2.end.x}, ${e$2.end.y}) cannot be before start (${e$2.start.x}, ${e$2.start.y})`);
					return t$2 * (e$2.end.y - e$2.start.y) + (e$2.end.x - e$2.start.x + 1);
				};
			},
			4634: (e$1, t$1) => {
				function i$1(e$2, t$2, i$2) {
					if (t$2 === e$2.length - 1) return e$2[t$2].getTrimmedLength();
					const s$1 = !e$2[t$2].hasContent(i$2 - 1) && 1 === e$2[t$2].getWidth(i$2 - 1), r = 2 === e$2[t$2 + 1].getWidth(0);
					return s$1 && r ? i$2 - 1 : i$2;
				}
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.getWrappedLineTrimmedLength = t$1.reflowSmallerGetNewLineLengths = t$1.reflowLargerApplyNewLayout = t$1.reflowLargerCreateNewLayout = t$1.reflowLargerGetLinesToRemove = void 0, t$1.reflowLargerGetLinesToRemove = function(e$2, t$2, s$1, r, n) {
					const o = [];
					for (let a = 0; a < e$2.length - 1; a++) {
						let h = a, c$1 = e$2.get(++h);
						if (!c$1.isWrapped) continue;
						const l = [e$2.get(a)];
						for (; h < e$2.length && c$1.isWrapped;) l.push(c$1), c$1 = e$2.get(++h);
						if (r >= a && r < h) {
							a += l.length - 1;
							continue;
						}
						let d = 0, _ = i$1(l, d, t$2), u = 1, f = 0;
						for (; u < l.length;) {
							const e$3 = i$1(l, u, t$2), r$1 = e$3 - f, o$1 = s$1 - _, a$1 = Math.min(r$1, o$1);
							l[d].copyCellsFrom(l[u], f, _, a$1, !1), _ += a$1, _ === s$1 && (d++, _ = 0), f += a$1, f === e$3 && (u++, f = 0), 0 === _ && 0 !== d && 2 === l[d - 1].getWidth(s$1 - 1) && (l[d].copyCellsFrom(l[d - 1], s$1 - 1, _++, 1, !1), l[d - 1].setCell(s$1 - 1, n));
						}
						l[d].replaceCells(_, s$1, n);
						let v = 0;
						for (let e$3 = l.length - 1; e$3 > 0 && (e$3 > d || 0 === l[e$3].getTrimmedLength()); e$3--) v++;
						v > 0 && (o.push(a + l.length - v), o.push(v)), a += l.length - 1;
					}
					return o;
				}, t$1.reflowLargerCreateNewLayout = function(e$2, t$2) {
					const i$2 = [];
					let s$1 = 0, r = t$2[s$1], n = 0;
					for (let o = 0; o < e$2.length; o++) if (r === o) {
						const i$3 = t$2[++s$1];
						e$2.onDeleteEmitter.fire({
							index: o - n,
							amount: i$3
						}), o += i$3 - 1, n += i$3, r = t$2[++s$1];
					} else i$2.push(o);
					return {
						layout: i$2,
						countRemoved: n
					};
				}, t$1.reflowLargerApplyNewLayout = function(e$2, t$2) {
					const i$2 = [];
					for (let s$1 = 0; s$1 < t$2.length; s$1++) i$2.push(e$2.get(t$2[s$1]));
					for (let t$3 = 0; t$3 < i$2.length; t$3++) e$2.set(t$3, i$2[t$3]);
					e$2.length = t$2.length;
				}, t$1.reflowSmallerGetNewLineLengths = function(e$2, t$2, s$1) {
					const r = [], n = e$2.map(((s$2, r$1) => i$1(e$2, r$1, t$2))).reduce(((e$3, t$3) => e$3 + t$3));
					let o = 0, a = 0, h = 0;
					for (; h < n;) {
						if (n - h < s$1) {
							r.push(n - h);
							break;
						}
						o += s$1;
						const c$1 = i$1(e$2, a, t$2);
						o > c$1 && (o -= c$1, a++);
						const l = 2 === e$2[a].getWidth(o - 1);
						l && o--;
						const d = l ? s$1 - 1 : s$1;
						r.push(d), h += d;
					}
					return r;
				}, t$1.getWrappedLineTrimmedLength = i$1;
			},
			5295: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferSet = void 0;
				const s$1 = i$1(8460), r = i$1(844), n = i$1(9092);
				class o extends r.Disposable {
					constructor(e$2, t$2) {
						super(), this._optionsService = e$2, this._bufferService = t$2, this._onBufferActivate = this.register(new s$1.EventEmitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", (() => this.resize(this._bufferService.cols, this._bufferService.rows)))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", (() => this.setupTabStops())));
					}
					reset() {
						this._normal = new n.Buffer(!0, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new n.Buffer(!1, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({
							activeBuffer: this._normal,
							inactiveBuffer: this._alt
						}), this.setupTabStops();
					}
					get alt() {
						return this._alt;
					}
					get active() {
						return this._activeBuffer;
					}
					get normal() {
						return this._normal;
					}
					activateNormalBuffer() {
						this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({
							activeBuffer: this._normal,
							inactiveBuffer: this._alt
						}));
					}
					activateAltBuffer(e$2) {
						this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e$2), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({
							activeBuffer: this._alt,
							inactiveBuffer: this._normal
						}));
					}
					resize(e$2, t$2) {
						this._normal.resize(e$2, t$2), this._alt.resize(e$2, t$2), this.setupTabStops(e$2);
					}
					setupTabStops(e$2) {
						this._normal.setupTabStops(e$2), this._alt.setupTabStops(e$2);
					}
				}
				t$1.BufferSet = o;
			},
			511: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CellData = void 0;
				const s$1 = i$1(482), r = i$1(643), n = i$1(3734);
				class o extends n.AttributeData {
					constructor() {
						super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs(), this.combinedData = "";
					}
					static fromCharData(e$2) {
						const t$2 = new o();
						return t$2.setFromCharData(e$2), t$2;
					}
					isCombined() {
						return 2097152 & this.content;
					}
					getWidth() {
						return this.content >> 22;
					}
					getChars() {
						return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s$1.stringFromCodePoint)(2097151 & this.content) : "";
					}
					getCode() {
						return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
					}
					setFromCharData(e$2) {
						this.fg = e$2[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
						let t$2 = !1;
						if (e$2[r.CHAR_DATA_CHAR_INDEX].length > 2) t$2 = !0;
						else if (2 === e$2[r.CHAR_DATA_CHAR_INDEX].length) {
							const i$2 = e$2[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
							if (55296 <= i$2 && i$2 <= 56319) {
								const s$2 = e$2[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
								56320 <= s$2 && s$2 <= 57343 ? this.content = 1024 * (i$2 - 55296) + s$2 - 56320 + 65536 | e$2[r.CHAR_DATA_WIDTH_INDEX] << 22 : t$2 = !0;
							} else t$2 = !0;
						} else this.content = e$2[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e$2[r.CHAR_DATA_WIDTH_INDEX] << 22;
						t$2 && (this.combinedData = e$2[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e$2[r.CHAR_DATA_WIDTH_INDEX] << 22);
					}
					getAsCharData() {
						return [
							this.fg,
							this.getChars(),
							this.getWidth(),
							this.getCode()
						];
					}
				}
				t$1.CellData = o;
			},
			643: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.WHITESPACE_CELL_CODE = t$1.WHITESPACE_CELL_WIDTH = t$1.WHITESPACE_CELL_CHAR = t$1.NULL_CELL_CODE = t$1.NULL_CELL_WIDTH = t$1.NULL_CELL_CHAR = t$1.CHAR_DATA_CODE_INDEX = t$1.CHAR_DATA_WIDTH_INDEX = t$1.CHAR_DATA_CHAR_INDEX = t$1.CHAR_DATA_ATTR_INDEX = t$1.DEFAULT_EXT = t$1.DEFAULT_ATTR = t$1.DEFAULT_COLOR = void 0, t$1.DEFAULT_COLOR = 0, t$1.DEFAULT_ATTR = 256 | t$1.DEFAULT_COLOR << 9, t$1.DEFAULT_EXT = 0, t$1.CHAR_DATA_ATTR_INDEX = 0, t$1.CHAR_DATA_CHAR_INDEX = 1, t$1.CHAR_DATA_WIDTH_INDEX = 2, t$1.CHAR_DATA_CODE_INDEX = 3, t$1.NULL_CELL_CHAR = "", t$1.NULL_CELL_WIDTH = 1, t$1.NULL_CELL_CODE = 0, t$1.WHITESPACE_CELL_CHAR = " ", t$1.WHITESPACE_CELL_WIDTH = 1, t$1.WHITESPACE_CELL_CODE = 32;
			},
			4863: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Marker = void 0;
				const s$1 = i$1(8460), r = i$1(844);
				class n {
					get id() {
						return this._id;
					}
					constructor(e$2) {
						this.line = e$2, this.isDisposed = !1, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new s$1.EventEmitter()), this.onDispose = this._onDispose.event;
					}
					dispose() {
						this.isDisposed || (this.isDisposed = !0, this.line = -1, this._onDispose.fire(), (0, r.disposeArray)(this._disposables), this._disposables.length = 0);
					}
					register(e$2) {
						return this._disposables.push(e$2), e$2;
					}
				}
				t$1.Marker = n, n._nextId = 1;
			},
			7116: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DEFAULT_CHARSET = t$1.CHARSETS = void 0, t$1.CHARSETS = {}, t$1.DEFAULT_CHARSET = t$1.CHARSETS.B, t$1.CHARSETS[0] = {
					"`": "◆",
					a: "▒",
					b: "␉",
					c: "␌",
					d: "␍",
					e: "␊",
					f: "°",
					g: "±",
					h: "␤",
					i: "␋",
					j: "┘",
					k: "┐",
					l: "┌",
					m: "└",
					n: "┼",
					o: "⎺",
					p: "⎻",
					q: "─",
					r: "⎼",
					s: "⎽",
					t: "├",
					u: "┤",
					v: "┴",
					w: "┬",
					x: "│",
					y: "≤",
					z: "≥",
					"{": "π",
					"|": "≠",
					"}": "£",
					"~": "·"
				}, t$1.CHARSETS.A = { "#": "£" }, t$1.CHARSETS.B = void 0, t$1.CHARSETS[4] = {
					"#": "£",
					"@": "¾",
					"[": "ij",
					"\\": "½",
					"]": "|",
					"{": "¨",
					"|": "f",
					"}": "¼",
					"~": "´"
				}, t$1.CHARSETS.C = t$1.CHARSETS[5] = {
					"[": "Ä",
					"\\": "Ö",
					"]": "Å",
					"^": "Ü",
					"`": "é",
					"{": "ä",
					"|": "ö",
					"}": "å",
					"~": "ü"
				}, t$1.CHARSETS.R = {
					"#": "£",
					"@": "à",
					"[": "°",
					"\\": "ç",
					"]": "§",
					"{": "é",
					"|": "ù",
					"}": "è",
					"~": "¨"
				}, t$1.CHARSETS.Q = {
					"@": "à",
					"[": "â",
					"\\": "ç",
					"]": "ê",
					"^": "î",
					"`": "ô",
					"{": "é",
					"|": "ù",
					"}": "è",
					"~": "û"
				}, t$1.CHARSETS.K = {
					"@": "§",
					"[": "Ä",
					"\\": "Ö",
					"]": "Ü",
					"{": "ä",
					"|": "ö",
					"}": "ü",
					"~": "ß"
				}, t$1.CHARSETS.Y = {
					"#": "£",
					"@": "§",
					"[": "°",
					"\\": "ç",
					"]": "é",
					"`": "ù",
					"{": "à",
					"|": "ò",
					"}": "è",
					"~": "ì"
				}, t$1.CHARSETS.E = t$1.CHARSETS[6] = {
					"@": "Ä",
					"[": "Æ",
					"\\": "Ø",
					"]": "Å",
					"^": "Ü",
					"`": "ä",
					"{": "æ",
					"|": "ø",
					"}": "å",
					"~": "ü"
				}, t$1.CHARSETS.Z = {
					"#": "£",
					"@": "§",
					"[": "¡",
					"\\": "Ñ",
					"]": "¿",
					"{": "°",
					"|": "ñ",
					"}": "ç"
				}, t$1.CHARSETS.H = t$1.CHARSETS[7] = {
					"@": "É",
					"[": "Ä",
					"\\": "Ö",
					"]": "Å",
					"^": "Ü",
					"`": "é",
					"{": "ä",
					"|": "ö",
					"}": "å",
					"~": "ü"
				}, t$1.CHARSETS["="] = {
					"#": "ù",
					"@": "à",
					"[": "é",
					"\\": "ç",
					"]": "ê",
					"^": "î",
					_: "è",
					"`": "ô",
					"{": "ä",
					"|": "ö",
					"}": "ü",
					"~": "û"
				};
			},
			2584: (e$1, t$1) => {
				var i$1, s$1, r;
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.C1_ESCAPED = t$1.C1 = t$1.C0 = void 0, function(e$2) {
					e$2.NUL = "\0", e$2.SOH = "", e$2.STX = "", e$2.ETX = "", e$2.EOT = "", e$2.ENQ = "", e$2.ACK = "", e$2.BEL = "\x07", e$2.BS = "\b", e$2.HT = "	", e$2.LF = "\n", e$2.VT = "\v", e$2.FF = "\f", e$2.CR = "\r", e$2.SO = "", e$2.SI = "", e$2.DLE = "", e$2.DC1 = "", e$2.DC2 = "", e$2.DC3 = "", e$2.DC4 = "", e$2.NAK = "", e$2.SYN = "", e$2.ETB = "", e$2.CAN = "", e$2.EM = "", e$2.SUB = "", e$2.ESC = "\x1B", e$2.FS = "", e$2.GS = "", e$2.RS = "", e$2.US = "", e$2.SP = " ", e$2.DEL = "";
				}(i$1 || (t$1.C0 = i$1 = {})), function(e$2) {
					e$2.PAD = "", e$2.HOP = "", e$2.BPH = "", e$2.NBH = "", e$2.IND = "", e$2.NEL = "", e$2.SSA = "", e$2.ESA = "", e$2.HTS = "", e$2.HTJ = "", e$2.VTS = "", e$2.PLD = "", e$2.PLU = "", e$2.RI = "", e$2.SS2 = "", e$2.SS3 = "", e$2.DCS = "", e$2.PU1 = "", e$2.PU2 = "", e$2.STS = "", e$2.CCH = "", e$2.MW = "", e$2.SPA = "", e$2.EPA = "", e$2.SOS = "", e$2.SGCI = "", e$2.SCI = "", e$2.CSI = "", e$2.ST = "", e$2.OSC = "", e$2.PM = "", e$2.APC = "";
				}(s$1 || (t$1.C1 = s$1 = {})), function(e$2) {
					e$2.ST = `${i$1.ESC}\\`;
				}(r || (t$1.C1_ESCAPED = r = {}));
			},
			7399: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.evaluateKeyboardEvent = void 0;
				const s$1 = i$1(2584), r = {
					48: ["0", ")"],
					49: ["1", "!"],
					50: ["2", "@"],
					51: ["3", "#"],
					52: ["4", "$"],
					53: ["5", "%"],
					54: ["6", "^"],
					55: ["7", "&"],
					56: ["8", "*"],
					57: ["9", "("],
					186: [";", ":"],
					187: ["=", "+"],
					188: [",", "<"],
					189: ["-", "_"],
					190: [".", ">"],
					191: ["/", "?"],
					192: ["`", "~"],
					219: ["[", "{"],
					220: ["\\", "|"],
					221: ["]", "}"],
					222: ["'", "\""]
				};
				t$1.evaluateKeyboardEvent = function(e$2, t$2, i$2, n) {
					const o = {
						type: 0,
						cancel: !1,
						key: void 0
					}, a = (e$2.shiftKey ? 1 : 0) | (e$2.altKey ? 2 : 0) | (e$2.ctrlKey ? 4 : 0) | (e$2.metaKey ? 8 : 0);
					switch (e$2.keyCode) {
						case 0:
							"UIKeyInputUpArrow" === e$2.key ? o.key = t$2 ? s$1.C0.ESC + "OA" : s$1.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e$2.key ? o.key = t$2 ? s$1.C0.ESC + "OD" : s$1.C0.ESC + "[D" : "UIKeyInputRightArrow" === e$2.key ? o.key = t$2 ? s$1.C0.ESC + "OC" : s$1.C0.ESC + "[C" : "UIKeyInputDownArrow" === e$2.key && (o.key = t$2 ? s$1.C0.ESC + "OB" : s$1.C0.ESC + "[B");
							break;
						case 8:
							o.key = e$2.ctrlKey ? "\b" : s$1.C0.DEL, e$2.altKey && (o.key = s$1.C0.ESC + o.key);
							break;
						case 9:
							if (e$2.shiftKey) {
								o.key = s$1.C0.ESC + "[Z";
								break;
							}
							o.key = s$1.C0.HT, o.cancel = !0;
							break;
						case 13:
							o.key = e$2.altKey ? s$1.C0.ESC + s$1.C0.CR : s$1.C0.CR, o.cancel = !0;
							break;
						case 27:
							o.key = s$1.C0.ESC, e$2.altKey && (o.key = s$1.C0.ESC + s$1.C0.ESC), o.cancel = !0;
							break;
						case 37:
							if (e$2.metaKey) break;
							a ? (o.key = s$1.C0.ESC + "[1;" + (a + 1) + "D", o.key === s$1.C0.ESC + "[1;3D" && (o.key = s$1.C0.ESC + (i$2 ? "b" : "[1;5D"))) : o.key = t$2 ? s$1.C0.ESC + "OD" : s$1.C0.ESC + "[D";
							break;
						case 39:
							if (e$2.metaKey) break;
							a ? (o.key = s$1.C0.ESC + "[1;" + (a + 1) + "C", o.key === s$1.C0.ESC + "[1;3C" && (o.key = s$1.C0.ESC + (i$2 ? "f" : "[1;5C"))) : o.key = t$2 ? s$1.C0.ESC + "OC" : s$1.C0.ESC + "[C";
							break;
						case 38:
							if (e$2.metaKey) break;
							a ? (o.key = s$1.C0.ESC + "[1;" + (a + 1) + "A", i$2 || o.key !== s$1.C0.ESC + "[1;3A" || (o.key = s$1.C0.ESC + "[1;5A")) : o.key = t$2 ? s$1.C0.ESC + "OA" : s$1.C0.ESC + "[A";
							break;
						case 40:
							if (e$2.metaKey) break;
							a ? (o.key = s$1.C0.ESC + "[1;" + (a + 1) + "B", i$2 || o.key !== s$1.C0.ESC + "[1;3B" || (o.key = s$1.C0.ESC + "[1;5B")) : o.key = t$2 ? s$1.C0.ESC + "OB" : s$1.C0.ESC + "[B";
							break;
						case 45:
							e$2.shiftKey || e$2.ctrlKey || (o.key = s$1.C0.ESC + "[2~");
							break;
						case 46:
							o.key = a ? s$1.C0.ESC + "[3;" + (a + 1) + "~" : s$1.C0.ESC + "[3~";
							break;
						case 36:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "H" : t$2 ? s$1.C0.ESC + "OH" : s$1.C0.ESC + "[H";
							break;
						case 35:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "F" : t$2 ? s$1.C0.ESC + "OF" : s$1.C0.ESC + "[F";
							break;
						case 33:
							e$2.shiftKey ? o.type = 2 : e$2.ctrlKey ? o.key = s$1.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s$1.C0.ESC + "[5~";
							break;
						case 34:
							e$2.shiftKey ? o.type = 3 : e$2.ctrlKey ? o.key = s$1.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s$1.C0.ESC + "[6~";
							break;
						case 112:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "P" : s$1.C0.ESC + "OP";
							break;
						case 113:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "Q" : s$1.C0.ESC + "OQ";
							break;
						case 114:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "R" : s$1.C0.ESC + "OR";
							break;
						case 115:
							o.key = a ? s$1.C0.ESC + "[1;" + (a + 1) + "S" : s$1.C0.ESC + "OS";
							break;
						case 116:
							o.key = a ? s$1.C0.ESC + "[15;" + (a + 1) + "~" : s$1.C0.ESC + "[15~";
							break;
						case 117:
							o.key = a ? s$1.C0.ESC + "[17;" + (a + 1) + "~" : s$1.C0.ESC + "[17~";
							break;
						case 118:
							o.key = a ? s$1.C0.ESC + "[18;" + (a + 1) + "~" : s$1.C0.ESC + "[18~";
							break;
						case 119:
							o.key = a ? s$1.C0.ESC + "[19;" + (a + 1) + "~" : s$1.C0.ESC + "[19~";
							break;
						case 120:
							o.key = a ? s$1.C0.ESC + "[20;" + (a + 1) + "~" : s$1.C0.ESC + "[20~";
							break;
						case 121:
							o.key = a ? s$1.C0.ESC + "[21;" + (a + 1) + "~" : s$1.C0.ESC + "[21~";
							break;
						case 122:
							o.key = a ? s$1.C0.ESC + "[23;" + (a + 1) + "~" : s$1.C0.ESC + "[23~";
							break;
						case 123:
							o.key = a ? s$1.C0.ESC + "[24;" + (a + 1) + "~" : s$1.C0.ESC + "[24~";
							break;
						default: if (!e$2.ctrlKey || e$2.shiftKey || e$2.altKey || e$2.metaKey) if (i$2 && !n || !e$2.altKey || e$2.metaKey) !i$2 || e$2.altKey || e$2.ctrlKey || e$2.shiftKey || !e$2.metaKey ? e$2.key && !e$2.ctrlKey && !e$2.altKey && !e$2.metaKey && e$2.keyCode >= 48 && 1 === e$2.key.length ? o.key = e$2.key : e$2.key && e$2.ctrlKey && ("_" === e$2.key && (o.key = s$1.C0.US), "@" === e$2.key && (o.key = s$1.C0.NUL)) : 65 === e$2.keyCode && (o.type = 1);
						else {
							const i$3 = r[e$2.keyCode]?.[e$2.shiftKey ? 1 : 0];
							if (i$3) o.key = s$1.C0.ESC + i$3;
							else if (e$2.keyCode >= 65 && e$2.keyCode <= 90) {
								const t$3 = e$2.ctrlKey ? e$2.keyCode - 64 : e$2.keyCode + 32;
								let i$4 = String.fromCharCode(t$3);
								e$2.shiftKey && (i$4 = i$4.toUpperCase()), o.key = s$1.C0.ESC + i$4;
							} else if (32 === e$2.keyCode) o.key = s$1.C0.ESC + (e$2.ctrlKey ? s$1.C0.NUL : " ");
							else if ("Dead" === e$2.key && e$2.code.startsWith("Key")) {
								let t$3 = e$2.code.slice(3, 4);
								e$2.shiftKey || (t$3 = t$3.toLowerCase()), o.key = s$1.C0.ESC + t$3, o.cancel = !0;
							}
						}
						else e$2.keyCode >= 65 && e$2.keyCode <= 90 ? o.key = String.fromCharCode(e$2.keyCode - 64) : 32 === e$2.keyCode ? o.key = s$1.C0.NUL : e$2.keyCode >= 51 && e$2.keyCode <= 55 ? o.key = String.fromCharCode(e$2.keyCode - 51 + 27) : 56 === e$2.keyCode ? o.key = s$1.C0.DEL : 219 === e$2.keyCode ? o.key = s$1.C0.ESC : 220 === e$2.keyCode ? o.key = s$1.C0.FS : 221 === e$2.keyCode && (o.key = s$1.C0.GS);
					}
					return o;
				};
			},
			482: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Utf8ToUtf32 = t$1.StringToUtf32 = t$1.utf32ToString = t$1.stringFromCodePoint = void 0, t$1.stringFromCodePoint = function(e$2) {
					return e$2 > 65535 ? (e$2 -= 65536, String.fromCharCode(55296 + (e$2 >> 10)) + String.fromCharCode(e$2 % 1024 + 56320)) : String.fromCharCode(e$2);
				}, t$1.utf32ToString = function(e$2, t$2 = 0, i$1 = e$2.length) {
					let s$1 = "";
					for (let r = t$2; r < i$1; ++r) {
						let t$3 = e$2[r];
						t$3 > 65535 ? (t$3 -= 65536, s$1 += String.fromCharCode(55296 + (t$3 >> 10)) + String.fromCharCode(t$3 % 1024 + 56320)) : s$1 += String.fromCharCode(t$3);
					}
					return s$1;
				}, t$1.StringToUtf32 = class {
					constructor() {
						this._interim = 0;
					}
					clear() {
						this._interim = 0;
					}
					decode(e$2, t$2) {
						const i$1 = e$2.length;
						if (!i$1) return 0;
						let s$1 = 0, r = 0;
						if (this._interim) {
							const i$2 = e$2.charCodeAt(r++);
							56320 <= i$2 && i$2 <= 57343 ? t$2[s$1++] = 1024 * (this._interim - 55296) + i$2 - 56320 + 65536 : (t$2[s$1++] = this._interim, t$2[s$1++] = i$2), this._interim = 0;
						}
						for (let n = r; n < i$1; ++n) {
							const r$1 = e$2.charCodeAt(n);
							if (55296 <= r$1 && r$1 <= 56319) {
								if (++n >= i$1) return this._interim = r$1, s$1;
								const o = e$2.charCodeAt(n);
								56320 <= o && o <= 57343 ? t$2[s$1++] = 1024 * (r$1 - 55296) + o - 56320 + 65536 : (t$2[s$1++] = r$1, t$2[s$1++] = o);
							} else 65279 !== r$1 && (t$2[s$1++] = r$1);
						}
						return s$1;
					}
				}, t$1.Utf8ToUtf32 = class {
					constructor() {
						this.interim = new Uint8Array(3);
					}
					clear() {
						this.interim.fill(0);
					}
					decode(e$2, t$2) {
						const i$1 = e$2.length;
						if (!i$1) return 0;
						let s$1, r, n, o, a = 0, h = 0, c$1 = 0;
						if (this.interim[0]) {
							let s$2 = !1, r$1 = this.interim[0];
							r$1 &= 192 == (224 & r$1) ? 31 : 224 == (240 & r$1) ? 15 : 7;
							let n$1, o$1 = 0;
							for (; (n$1 = 63 & this.interim[++o$1]) && o$1 < 4;) r$1 <<= 6, r$1 |= n$1;
							const h$1 = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, l$1 = h$1 - o$1;
							for (; c$1 < l$1;) {
								if (c$1 >= i$1) return 0;
								if (n$1 = e$2[c$1++], 128 != (192 & n$1)) {
									c$1--, s$2 = !0;
									break;
								}
								this.interim[o$1++] = n$1, r$1 <<= 6, r$1 |= 63 & n$1;
							}
							s$2 || (2 === h$1 ? r$1 < 128 ? c$1-- : t$2[a++] = r$1 : 3 === h$1 ? r$1 < 2048 || r$1 >= 55296 && r$1 <= 57343 || 65279 === r$1 || (t$2[a++] = r$1) : r$1 < 65536 || r$1 > 1114111 || (t$2[a++] = r$1)), this.interim.fill(0);
						}
						const l = i$1 - 4;
						let d = c$1;
						for (; d < i$1;) {
							for (; !(!(d < l) || 128 & (s$1 = e$2[d]) || 128 & (r = e$2[d + 1]) || 128 & (n = e$2[d + 2]) || 128 & (o = e$2[d + 3]));) t$2[a++] = s$1, t$2[a++] = r, t$2[a++] = n, t$2[a++] = o, d += 4;
							if (s$1 = e$2[d++], s$1 < 128) t$2[a++] = s$1;
							else if (192 == (224 & s$1)) {
								if (d >= i$1) return this.interim[0] = s$1, a;
								if (r = e$2[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (h = (31 & s$1) << 6 | 63 & r, h < 128) {
									d--;
									continue;
								}
								t$2[a++] = h;
							} else if (224 == (240 & s$1)) {
								if (d >= i$1) return this.interim[0] = s$1, a;
								if (r = e$2[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (d >= i$1) return this.interim[0] = s$1, this.interim[1] = r, a;
								if (n = e$2[d++], 128 != (192 & n)) {
									d--;
									continue;
								}
								if (h = (15 & s$1) << 12 | (63 & r) << 6 | 63 & n, h < 2048 || h >= 55296 && h <= 57343 || 65279 === h) continue;
								t$2[a++] = h;
							} else if (240 == (248 & s$1)) {
								if (d >= i$1) return this.interim[0] = s$1, a;
								if (r = e$2[d++], 128 != (192 & r)) {
									d--;
									continue;
								}
								if (d >= i$1) return this.interim[0] = s$1, this.interim[1] = r, a;
								if (n = e$2[d++], 128 != (192 & n)) {
									d--;
									continue;
								}
								if (d >= i$1) return this.interim[0] = s$1, this.interim[1] = r, this.interim[2] = n, a;
								if (o = e$2[d++], 128 != (192 & o)) {
									d--;
									continue;
								}
								if (h = (7 & s$1) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, h < 65536 || h > 1114111) continue;
								t$2[a++] = h;
							}
						}
						return a;
					}
				};
			},
			225: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.UnicodeV6 = void 0;
				const s$1 = i$1(1480), r = [
					[768, 879],
					[1155, 1158],
					[1160, 1161],
					[1425, 1469],
					[1471, 1471],
					[1473, 1474],
					[1476, 1477],
					[1479, 1479],
					[1536, 1539],
					[1552, 1557],
					[1611, 1630],
					[1648, 1648],
					[1750, 1764],
					[1767, 1768],
					[1770, 1773],
					[1807, 1807],
					[1809, 1809],
					[1840, 1866],
					[1958, 1968],
					[2027, 2035],
					[2305, 2306],
					[2364, 2364],
					[2369, 2376],
					[2381, 2381],
					[2385, 2388],
					[2402, 2403],
					[2433, 2433],
					[2492, 2492],
					[2497, 2500],
					[2509, 2509],
					[2530, 2531],
					[2561, 2562],
					[2620, 2620],
					[2625, 2626],
					[2631, 2632],
					[2635, 2637],
					[2672, 2673],
					[2689, 2690],
					[2748, 2748],
					[2753, 2757],
					[2759, 2760],
					[2765, 2765],
					[2786, 2787],
					[2817, 2817],
					[2876, 2876],
					[2879, 2879],
					[2881, 2883],
					[2893, 2893],
					[2902, 2902],
					[2946, 2946],
					[3008, 3008],
					[3021, 3021],
					[3134, 3136],
					[3142, 3144],
					[3146, 3149],
					[3157, 3158],
					[3260, 3260],
					[3263, 3263],
					[3270, 3270],
					[3276, 3277],
					[3298, 3299],
					[3393, 3395],
					[3405, 3405],
					[3530, 3530],
					[3538, 3540],
					[3542, 3542],
					[3633, 3633],
					[3636, 3642],
					[3655, 3662],
					[3761, 3761],
					[3764, 3769],
					[3771, 3772],
					[3784, 3789],
					[3864, 3865],
					[3893, 3893],
					[3895, 3895],
					[3897, 3897],
					[3953, 3966],
					[3968, 3972],
					[3974, 3975],
					[3984, 3991],
					[3993, 4028],
					[4038, 4038],
					[4141, 4144],
					[4146, 4146],
					[4150, 4151],
					[4153, 4153],
					[4184, 4185],
					[4448, 4607],
					[4959, 4959],
					[5906, 5908],
					[5938, 5940],
					[5970, 5971],
					[6002, 6003],
					[6068, 6069],
					[6071, 6077],
					[6086, 6086],
					[6089, 6099],
					[6109, 6109],
					[6155, 6157],
					[6313, 6313],
					[6432, 6434],
					[6439, 6440],
					[6450, 6450],
					[6457, 6459],
					[6679, 6680],
					[6912, 6915],
					[6964, 6964],
					[6966, 6970],
					[6972, 6972],
					[6978, 6978],
					[7019, 7027],
					[7616, 7626],
					[7678, 7679],
					[8203, 8207],
					[8234, 8238],
					[8288, 8291],
					[8298, 8303],
					[8400, 8431],
					[12330, 12335],
					[12441, 12442],
					[43014, 43014],
					[43019, 43019],
					[43045, 43046],
					[64286, 64286],
					[65024, 65039],
					[65056, 65059],
					[65279, 65279],
					[65529, 65531]
				], n = [
					[68097, 68099],
					[68101, 68102],
					[68108, 68111],
					[68152, 68154],
					[68159, 68159],
					[119143, 119145],
					[119155, 119170],
					[119173, 119179],
					[119210, 119213],
					[119362, 119364],
					[917505, 917505],
					[917536, 917631],
					[917760, 917999]
				];
				let o;
				t$1.UnicodeV6 = class {
					constructor() {
						if (this.version = "6", !o) {
							o = new Uint8Array(65536), o.fill(1), o[0] = 0, o.fill(0, 1, 32), o.fill(0, 127, 160), o.fill(2, 4352, 4448), o[9001] = 2, o[9002] = 2, o.fill(2, 11904, 42192), o[12351] = 1, o.fill(2, 44032, 55204), o.fill(2, 63744, 64256), o.fill(2, 65040, 65050), o.fill(2, 65072, 65136), o.fill(2, 65280, 65377), o.fill(2, 65504, 65511);
							for (let e$2 = 0; e$2 < r.length; ++e$2) o.fill(0, r[e$2][0], r[e$2][1] + 1);
						}
					}
					wcwidth(e$2) {
						return e$2 < 32 ? 0 : e$2 < 127 ? 1 : e$2 < 65536 ? o[e$2] : function(e$3, t$2) {
							let i$2, s$2 = 0, r$1 = t$2.length - 1;
							if (e$3 < t$2[0][0] || e$3 > t$2[r$1][1]) return !1;
							for (; r$1 >= s$2;) if (i$2 = s$2 + r$1 >> 1, e$3 > t$2[i$2][1]) s$2 = i$2 + 1;
							else {
								if (!(e$3 < t$2[i$2][0])) return !0;
								r$1 = i$2 - 1;
							}
							return !1;
						}(e$2, n) ? 0 : e$2 >= 131072 && e$2 <= 196605 || e$2 >= 196608 && e$2 <= 262141 ? 2 : 1;
					}
					charProperties(e$2, t$2) {
						let i$2 = this.wcwidth(e$2), r$1 = 0 === i$2 && 0 !== t$2;
						if (r$1) {
							const e$3 = s$1.UnicodeService.extractWidth(t$2);
							0 === e$3 ? r$1 = !1 : e$3 > i$2 && (i$2 = e$3);
						}
						return s$1.UnicodeService.createPropertyValue(0, i$2, r$1);
					}
				};
			},
			5981: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.WriteBuffer = void 0;
				const s$1 = i$1(8460), r = i$1(844);
				class n extends r.Disposable {
					constructor(e$2) {
						super(), this._action = e$2, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = !1, this._syncCalls = 0, this._didUserInput = !1, this._onWriteParsed = this.register(new s$1.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event;
					}
					handleUserInput() {
						this._didUserInput = !0;
					}
					writeSync(e$2, t$2) {
						if (void 0 !== t$2 && this._syncCalls > t$2) return void (this._syncCalls = 0);
						if (this._pendingData += e$2.length, this._writeBuffer.push(e$2), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
						let i$2;
						for (this._isSyncWriting = !0; i$2 = this._writeBuffer.shift();) {
							this._action(i$2);
							const e$3 = this._callbacks.shift();
							e$3 && e$3();
						}
						this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = !1, this._syncCalls = 0;
					}
					write(e$2, t$2) {
						if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
						if (!this._writeBuffer.length) {
							if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = !1, this._pendingData += e$2.length, this._writeBuffer.push(e$2), this._callbacks.push(t$2), void this._innerWrite();
							setTimeout((() => this._innerWrite()));
						}
						this._pendingData += e$2.length, this._writeBuffer.push(e$2), this._callbacks.push(t$2);
					}
					_innerWrite(e$2 = 0, t$2 = !0) {
						const i$2 = e$2 || Date.now();
						for (; this._writeBuffer.length > this._bufferOffset;) {
							const e$3 = this._writeBuffer[this._bufferOffset], s$2 = this._action(e$3, t$2);
							if (s$2) {
								const e$4 = (e$5) => Date.now() - i$2 >= 12 ? setTimeout((() => this._innerWrite(0, e$5))) : this._innerWrite(i$2, e$5);
								s$2.catch(((e$5) => (queueMicrotask((() => {
									throw e$5;
								})), Promise.resolve(!1)))).then(e$4);
								return;
							}
							const r$1 = this._callbacks[this._bufferOffset];
							if (r$1 && r$1(), this._bufferOffset++, this._pendingData -= e$3.length, Date.now() - i$2 >= 12) break;
						}
						this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout((() => this._innerWrite()))) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
					}
				}
				t$1.WriteBuffer = n;
			},
			5941: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.toRgbString = t$1.parseColor = void 0;
				const i$1 = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s$1 = /^[\da-f]+$/;
				function r(e$2, t$2) {
					const i$2 = e$2.toString(16), s$2 = i$2.length < 2 ? "0" + i$2 : i$2;
					switch (t$2) {
						case 4: return i$2[0];
						case 8: return s$2;
						case 12: return (s$2 + s$2).slice(0, 3);
						default: return s$2 + s$2;
					}
				}
				t$1.parseColor = function(e$2) {
					if (!e$2) return;
					let t$2 = e$2.toLowerCase();
					if (0 === t$2.indexOf("rgb:")) {
						t$2 = t$2.slice(4);
						const e$3 = i$1.exec(t$2);
						if (e$3) {
							const t$3 = e$3[1] ? 15 : e$3[4] ? 255 : e$3[7] ? 4095 : 65535;
							return [
								Math.round(parseInt(e$3[1] || e$3[4] || e$3[7] || e$3[10], 16) / t$3 * 255),
								Math.round(parseInt(e$3[2] || e$3[5] || e$3[8] || e$3[11], 16) / t$3 * 255),
								Math.round(parseInt(e$3[3] || e$3[6] || e$3[9] || e$3[12], 16) / t$3 * 255)
							];
						}
					} else if (0 === t$2.indexOf("#") && (t$2 = t$2.slice(1), s$1.exec(t$2) && [
						3,
						6,
						9,
						12
					].includes(t$2.length))) {
						const e$3 = t$2.length / 3, i$2 = [
							0,
							0,
							0
						];
						for (let s$2 = 0; s$2 < 3; ++s$2) {
							const r$1 = parseInt(t$2.slice(e$3 * s$2, e$3 * s$2 + e$3), 16);
							i$2[s$2] = 1 === e$3 ? r$1 << 4 : 2 === e$3 ? r$1 : 3 === e$3 ? r$1 >> 4 : r$1 >> 8;
						}
						return i$2;
					}
				}, t$1.toRgbString = function(e$2, t$2 = 16) {
					const [i$2, s$2, n] = e$2;
					return `rgb:${r(i$2, t$2)}/${r(s$2, t$2)}/${r(n, t$2)}`;
				};
			},
			5770: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.PAYLOAD_LIMIT = void 0, t$1.PAYLOAD_LIMIT = 1e7;
			},
			6351: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DcsHandler = t$1.DcsParser = void 0;
				const s$1 = i$1(482), r = i$1(8742), n = i$1(5770), o = [];
				t$1.DcsParser = class {
					constructor() {
						this._handlers = Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {}, this._stack = {
							paused: !1,
							loopPosition: 0,
							fallThrough: !1
						};
					}
					dispose() {
						this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = o;
					}
					registerHandler(e$2, t$2) {
						void 0 === this._handlers[e$2] && (this._handlers[e$2] = []);
						const i$2 = this._handlers[e$2];
						return i$2.push(t$2), { dispose: () => {
							const e$3 = i$2.indexOf(t$2);
							-1 !== e$3 && i$2.splice(e$3, 1);
						} };
					}
					clearHandler(e$2) {
						this._handlers[e$2] && delete this._handlers[e$2];
					}
					setHandlerFallback(e$2) {
						this._handlerFb = e$2;
					}
					reset() {
						if (this._active.length) for (let e$2 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e$2 >= 0; --e$2) this._active[e$2].unhook(!1);
						this._stack.paused = !1, this._active = o, this._ident = 0;
					}
					hook(e$2, t$2) {
						if (this.reset(), this._ident = e$2, this._active = this._handlers[e$2] || o, this._active.length) for (let e$3 = this._active.length - 1; e$3 >= 0; e$3--) this._active[e$3].hook(t$2);
						else this._handlerFb(this._ident, "HOOK", t$2);
					}
					put(e$2, t$2, i$2) {
						if (this._active.length) for (let s$2 = this._active.length - 1; s$2 >= 0; s$2--) this._active[s$2].put(e$2, t$2, i$2);
						else this._handlerFb(this._ident, "PUT", (0, s$1.utf32ToString)(e$2, t$2, i$2));
					}
					unhook(e$2, t$2 = !0) {
						if (this._active.length) {
							let i$2 = !1, s$2 = this._active.length - 1, r$1 = !1;
							if (this._stack.paused && (s$2 = this._stack.loopPosition - 1, i$2 = t$2, r$1 = this._stack.fallThrough, this._stack.paused = !1), !r$1 && !1 === i$2) {
								for (; s$2 >= 0 && (i$2 = this._active[s$2].unhook(e$2), !0 !== i$2); s$2--) if (i$2 instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s$2, this._stack.fallThrough = !1, i$2;
								s$2--;
							}
							for (; s$2 >= 0; s$2--) if (i$2 = this._active[s$2].unhook(!1), i$2 instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s$2, this._stack.fallThrough = !0, i$2;
						} else this._handlerFb(this._ident, "UNHOOK", e$2);
						this._active = o, this._ident = 0;
					}
				};
				const a = new r.Params();
				a.addParam(0), t$1.DcsHandler = class {
					constructor(e$2) {
						this._handler = e$2, this._data = "", this._params = a, this._hitLimit = !1;
					}
					hook(e$2) {
						this._params = e$2.length > 1 || e$2.params[0] ? e$2.clone() : a, this._data = "", this._hitLimit = !1;
					}
					put(e$2, t$2, i$2) {
						this._hitLimit || (this._data += (0, s$1.utf32ToString)(e$2, t$2, i$2), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
					}
					unhook(e$2) {
						let t$2 = !1;
						if (this._hitLimit) t$2 = !1;
						else if (e$2 && (t$2 = this._handler(this._data, this._params), t$2 instanceof Promise)) return t$2.then(((e$3) => (this._params = a, this._data = "", this._hitLimit = !1, e$3)));
						return this._params = a, this._data = "", this._hitLimit = !1, t$2;
					}
				};
			},
			2015: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.EscapeSequenceParser = t$1.VT500_TRANSITION_TABLE = t$1.TransitionTable = void 0;
				const s$1 = i$1(844), r = i$1(8742), n = i$1(6242), o = i$1(6351);
				class a {
					constructor(e$2) {
						this.table = new Uint8Array(e$2);
					}
					setDefault(e$2, t$2) {
						this.table.fill(e$2 << 4 | t$2);
					}
					add(e$2, t$2, i$2, s$2) {
						this.table[t$2 << 8 | e$2] = i$2 << 4 | s$2;
					}
					addMany(e$2, t$2, i$2, s$2) {
						for (let r$1 = 0; r$1 < e$2.length; r$1++) this.table[t$2 << 8 | e$2[r$1]] = i$2 << 4 | s$2;
					}
				}
				t$1.TransitionTable = a;
				const h = 160;
				t$1.VT500_TRANSITION_TABLE = function() {
					const e$2 = new a(4095), t$2 = Array.apply(null, Array(256)).map(((e$3, t$3) => t$3)), i$2 = (e$3, i$3) => t$2.slice(e$3, i$3), s$2 = i$2(32, 127), r$1 = i$2(0, 24);
					r$1.push(25), r$1.push.apply(r$1, i$2(28, 32));
					const n$1 = i$2(0, 14);
					let o$1;
					for (o$1 in e$2.setDefault(1, 0), e$2.addMany(s$2, 0, 2, 0), n$1) e$2.addMany([
						24,
						26,
						153,
						154
					], o$1, 3, 0), e$2.addMany(i$2(128, 144), o$1, 3, 0), e$2.addMany(i$2(144, 152), o$1, 3, 0), e$2.add(156, o$1, 0, 0), e$2.add(27, o$1, 11, 1), e$2.add(157, o$1, 4, 8), e$2.addMany([
						152,
						158,
						159
					], o$1, 0, 7), e$2.add(155, o$1, 11, 3), e$2.add(144, o$1, 11, 9);
					return e$2.addMany(r$1, 0, 3, 0), e$2.addMany(r$1, 1, 3, 1), e$2.add(127, 1, 0, 1), e$2.addMany(r$1, 8, 0, 8), e$2.addMany(r$1, 3, 3, 3), e$2.add(127, 3, 0, 3), e$2.addMany(r$1, 4, 3, 4), e$2.add(127, 4, 0, 4), e$2.addMany(r$1, 6, 3, 6), e$2.addMany(r$1, 5, 3, 5), e$2.add(127, 5, 0, 5), e$2.addMany(r$1, 2, 3, 2), e$2.add(127, 2, 0, 2), e$2.add(93, 1, 4, 8), e$2.addMany(s$2, 8, 5, 8), e$2.add(127, 8, 5, 8), e$2.addMany([
						156,
						27,
						24,
						26,
						7
					], 8, 6, 0), e$2.addMany(i$2(28, 32), 8, 0, 8), e$2.addMany([
						88,
						94,
						95
					], 1, 0, 7), e$2.addMany(s$2, 7, 0, 7), e$2.addMany(r$1, 7, 0, 7), e$2.add(156, 7, 0, 0), e$2.add(127, 7, 0, 7), e$2.add(91, 1, 11, 3), e$2.addMany(i$2(64, 127), 3, 7, 0), e$2.addMany(i$2(48, 60), 3, 8, 4), e$2.addMany([
						60,
						61,
						62,
						63
					], 3, 9, 4), e$2.addMany(i$2(48, 60), 4, 8, 4), e$2.addMany(i$2(64, 127), 4, 7, 0), e$2.addMany([
						60,
						61,
						62,
						63
					], 4, 0, 6), e$2.addMany(i$2(32, 64), 6, 0, 6), e$2.add(127, 6, 0, 6), e$2.addMany(i$2(64, 127), 6, 0, 0), e$2.addMany(i$2(32, 48), 3, 9, 5), e$2.addMany(i$2(32, 48), 5, 9, 5), e$2.addMany(i$2(48, 64), 5, 0, 6), e$2.addMany(i$2(64, 127), 5, 7, 0), e$2.addMany(i$2(32, 48), 4, 9, 5), e$2.addMany(i$2(32, 48), 1, 9, 2), e$2.addMany(i$2(32, 48), 2, 9, 2), e$2.addMany(i$2(48, 127), 2, 10, 0), e$2.addMany(i$2(48, 80), 1, 10, 0), e$2.addMany(i$2(81, 88), 1, 10, 0), e$2.addMany([
						89,
						90,
						92
					], 1, 10, 0), e$2.addMany(i$2(96, 127), 1, 10, 0), e$2.add(80, 1, 11, 9), e$2.addMany(r$1, 9, 0, 9), e$2.add(127, 9, 0, 9), e$2.addMany(i$2(28, 32), 9, 0, 9), e$2.addMany(i$2(32, 48), 9, 9, 12), e$2.addMany(i$2(48, 60), 9, 8, 10), e$2.addMany([
						60,
						61,
						62,
						63
					], 9, 9, 10), e$2.addMany(r$1, 11, 0, 11), e$2.addMany(i$2(32, 128), 11, 0, 11), e$2.addMany(i$2(28, 32), 11, 0, 11), e$2.addMany(r$1, 10, 0, 10), e$2.add(127, 10, 0, 10), e$2.addMany(i$2(28, 32), 10, 0, 10), e$2.addMany(i$2(48, 60), 10, 8, 10), e$2.addMany([
						60,
						61,
						62,
						63
					], 10, 0, 11), e$2.addMany(i$2(32, 48), 10, 9, 12), e$2.addMany(r$1, 12, 0, 12), e$2.add(127, 12, 0, 12), e$2.addMany(i$2(28, 32), 12, 0, 12), e$2.addMany(i$2(32, 48), 12, 9, 12), e$2.addMany(i$2(48, 64), 12, 0, 11), e$2.addMany(i$2(64, 127), 12, 12, 13), e$2.addMany(i$2(64, 127), 10, 12, 13), e$2.addMany(i$2(64, 127), 9, 12, 13), e$2.addMany(r$1, 13, 13, 13), e$2.addMany(s$2, 13, 13, 13), e$2.add(127, 13, 0, 13), e$2.addMany([
						27,
						156,
						24,
						26
					], 13, 14, 0), e$2.add(h, 0, 2, 0), e$2.add(h, 8, 5, 8), e$2.add(h, 6, 0, 6), e$2.add(h, 11, 0, 11), e$2.add(h, 13, 13, 13), e$2;
				}();
				class c$1 extends s$1.Disposable {
					constructor(e$2 = t$1.VT500_TRANSITION_TABLE) {
						super(), this._transitions = e$2, this._parseStack = {
							state: 0,
							handlers: [],
							handlerPos: 0,
							transition: 0,
							chunkPos: 0
						}, this.initialState = 0, this.currentState = this.initialState, this._params = new r.Params(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e$3, t$2, i$2) => {}, this._executeHandlerFb = (e$3) => {}, this._csiHandlerFb = (e$3, t$2) => {}, this._escHandlerFb = (e$3) => {}, this._errorHandlerFb = (e$3) => e$3, this._printHandler = this._printHandlerFb, this._executeHandlers = Object.create(null), this._csiHandlers = Object.create(null), this._escHandlers = Object.create(null), this.register((0, s$1.toDisposable)((() => {
							this._csiHandlers = Object.create(null), this._executeHandlers = Object.create(null), this._escHandlers = Object.create(null);
						}))), this._oscParser = this.register(new n.OscParser()), this._dcsParser = this.register(new o.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, (() => !0));
					}
					_identifier(e$2, t$2 = [64, 126]) {
						let i$2 = 0;
						if (e$2.prefix) {
							if (e$2.prefix.length > 1) throw new Error("only one byte as prefix supported");
							if (i$2 = e$2.prefix.charCodeAt(0), i$2 && 60 > i$2 || i$2 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
						}
						if (e$2.intermediates) {
							if (e$2.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
							for (let t$3 = 0; t$3 < e$2.intermediates.length; ++t$3) {
								const s$3 = e$2.intermediates.charCodeAt(t$3);
								if (32 > s$3 || s$3 > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
								i$2 <<= 8, i$2 |= s$3;
							}
						}
						if (1 !== e$2.final.length) throw new Error("final must be a single byte");
						const s$2 = e$2.final.charCodeAt(0);
						if (t$2[0] > s$2 || s$2 > t$2[1]) throw new Error(`final must be in range ${t$2[0]} .. ${t$2[1]}`);
						return i$2 <<= 8, i$2 |= s$2, i$2;
					}
					identToString(e$2) {
						const t$2 = [];
						for (; e$2;) t$2.push(String.fromCharCode(255 & e$2)), e$2 >>= 8;
						return t$2.reverse().join("");
					}
					setPrintHandler(e$2) {
						this._printHandler = e$2;
					}
					clearPrintHandler() {
						this._printHandler = this._printHandlerFb;
					}
					registerEscHandler(e$2, t$2) {
						const i$2 = this._identifier(e$2, [48, 126]);
						void 0 === this._escHandlers[i$2] && (this._escHandlers[i$2] = []);
						const s$2 = this._escHandlers[i$2];
						return s$2.push(t$2), { dispose: () => {
							const e$3 = s$2.indexOf(t$2);
							-1 !== e$3 && s$2.splice(e$3, 1);
						} };
					}
					clearEscHandler(e$2) {
						this._escHandlers[this._identifier(e$2, [48, 126])] && delete this._escHandlers[this._identifier(e$2, [48, 126])];
					}
					setEscHandlerFallback(e$2) {
						this._escHandlerFb = e$2;
					}
					setExecuteHandler(e$2, t$2) {
						this._executeHandlers[e$2.charCodeAt(0)] = t$2;
					}
					clearExecuteHandler(e$2) {
						this._executeHandlers[e$2.charCodeAt(0)] && delete this._executeHandlers[e$2.charCodeAt(0)];
					}
					setExecuteHandlerFallback(e$2) {
						this._executeHandlerFb = e$2;
					}
					registerCsiHandler(e$2, t$2) {
						const i$2 = this._identifier(e$2);
						void 0 === this._csiHandlers[i$2] && (this._csiHandlers[i$2] = []);
						const s$2 = this._csiHandlers[i$2];
						return s$2.push(t$2), { dispose: () => {
							const e$3 = s$2.indexOf(t$2);
							-1 !== e$3 && s$2.splice(e$3, 1);
						} };
					}
					clearCsiHandler(e$2) {
						this._csiHandlers[this._identifier(e$2)] && delete this._csiHandlers[this._identifier(e$2)];
					}
					setCsiHandlerFallback(e$2) {
						this._csiHandlerFb = e$2;
					}
					registerDcsHandler(e$2, t$2) {
						return this._dcsParser.registerHandler(this._identifier(e$2), t$2);
					}
					clearDcsHandler(e$2) {
						this._dcsParser.clearHandler(this._identifier(e$2));
					}
					setDcsHandlerFallback(e$2) {
						this._dcsParser.setHandlerFallback(e$2);
					}
					registerOscHandler(e$2, t$2) {
						return this._oscParser.registerHandler(e$2, t$2);
					}
					clearOscHandler(e$2) {
						this._oscParser.clearHandler(e$2);
					}
					setOscHandlerFallback(e$2) {
						this._oscParser.setHandlerFallback(e$2);
					}
					setErrorHandler(e$2) {
						this._errorHandler = e$2;
					}
					clearErrorHandler() {
						this._errorHandler = this._errorHandlerFb;
					}
					reset() {
						this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
					}
					_preserveStack(e$2, t$2, i$2, s$2, r$1) {
						this._parseStack.state = e$2, this._parseStack.handlers = t$2, this._parseStack.handlerPos = i$2, this._parseStack.transition = s$2, this._parseStack.chunkPos = r$1;
					}
					parse(e$2, t$2, i$2) {
						let s$2, r$1 = 0, n$1 = 0, o$1 = 0;
						if (this._parseStack.state) if (2 === this._parseStack.state) this._parseStack.state = 0, o$1 = this._parseStack.chunkPos + 1;
						else {
							if (void 0 === i$2 || 1 === this._parseStack.state) throw this._parseStack.state = 1, /* @__PURE__ */ new Error("improper continuation due to previous async handler, giving up parsing");
							const t$3 = this._parseStack.handlers;
							let n$2 = this._parseStack.handlerPos - 1;
							switch (this._parseStack.state) {
								case 3:
									if (!1 === i$2 && n$2 > -1) {
										for (; n$2 >= 0 && (s$2 = t$3[n$2](this._params), !0 !== s$2); n$2--) if (s$2 instanceof Promise) return this._parseStack.handlerPos = n$2, s$2;
									}
									this._parseStack.handlers = [];
									break;
								case 4:
									if (!1 === i$2 && n$2 > -1) {
										for (; n$2 >= 0 && (s$2 = t$3[n$2](), !0 !== s$2); n$2--) if (s$2 instanceof Promise) return this._parseStack.handlerPos = n$2, s$2;
									}
									this._parseStack.handlers = [];
									break;
								case 6:
									if (r$1 = e$2[this._parseStack.chunkPos], s$2 = this._dcsParser.unhook(24 !== r$1 && 26 !== r$1, i$2), s$2) return s$2;
									27 === r$1 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
									break;
								case 5:
									if (r$1 = e$2[this._parseStack.chunkPos], s$2 = this._oscParser.end(24 !== r$1 && 26 !== r$1, i$2), s$2) return s$2;
									27 === r$1 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
							}
							this._parseStack.state = 0, o$1 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
						}
						for (let i$3 = o$1; i$3 < t$2; ++i$3) {
							switch (r$1 = e$2[i$3], n$1 = this._transitions.table[this.currentState << 8 | (r$1 < 160 ? r$1 : h)], n$1 >> 4) {
								case 2:
									for (let s$3 = i$3 + 1;; ++s$3) {
										if (s$3 >= t$2 || (r$1 = e$2[s$3]) < 32 || r$1 > 126 && r$1 < h) {
											this._printHandler(e$2, i$3, s$3), i$3 = s$3 - 1;
											break;
										}
										if (++s$3 >= t$2 || (r$1 = e$2[s$3]) < 32 || r$1 > 126 && r$1 < h) {
											this._printHandler(e$2, i$3, s$3), i$3 = s$3 - 1;
											break;
										}
										if (++s$3 >= t$2 || (r$1 = e$2[s$3]) < 32 || r$1 > 126 && r$1 < h) {
											this._printHandler(e$2, i$3, s$3), i$3 = s$3 - 1;
											break;
										}
										if (++s$3 >= t$2 || (r$1 = e$2[s$3]) < 32 || r$1 > 126 && r$1 < h) {
											this._printHandler(e$2, i$3, s$3), i$3 = s$3 - 1;
											break;
										}
									}
									break;
								case 3:
									this._executeHandlers[r$1] ? this._executeHandlers[r$1]() : this._executeHandlerFb(r$1), this.precedingJoinState = 0;
									break;
								case 0: break;
								case 1:
									if (this._errorHandler({
										position: i$3,
										code: r$1,
										currentState: this.currentState,
										collect: this._collect,
										params: this._params,
										abort: !1
									}).abort) return;
									break;
								case 7:
									const o$2 = this._csiHandlers[this._collect << 8 | r$1];
									let a$1 = o$2 ? o$2.length - 1 : -1;
									for (; a$1 >= 0 && (s$2 = o$2[a$1](this._params), !0 !== s$2); a$1--) if (s$2 instanceof Promise) return this._preserveStack(3, o$2, a$1, n$1, i$3), s$2;
									a$1 < 0 && this._csiHandlerFb(this._collect << 8 | r$1, this._params), this.precedingJoinState = 0;
									break;
								case 8:
									do
										switch (r$1) {
											case 59:
												this._params.addParam(0);
												break;
											case 58:
												this._params.addSubParam(-1);
												break;
											default: this._params.addDigit(r$1 - 48);
										}
									while (++i$3 < t$2 && (r$1 = e$2[i$3]) > 47 && r$1 < 60);
									i$3--;
									break;
								case 9:
									this._collect <<= 8, this._collect |= r$1;
									break;
								case 10:
									const c$2 = this._escHandlers[this._collect << 8 | r$1];
									let l = c$2 ? c$2.length - 1 : -1;
									for (; l >= 0 && (s$2 = c$2[l](), !0 !== s$2); l--) if (s$2 instanceof Promise) return this._preserveStack(4, c$2, l, n$1, i$3), s$2;
									l < 0 && this._escHandlerFb(this._collect << 8 | r$1), this.precedingJoinState = 0;
									break;
								case 11:
									this._params.reset(), this._params.addParam(0), this._collect = 0;
									break;
								case 12:
									this._dcsParser.hook(this._collect << 8 | r$1, this._params);
									break;
								case 13:
									for (let s$3 = i$3 + 1;; ++s$3) if (s$3 >= t$2 || 24 === (r$1 = e$2[s$3]) || 26 === r$1 || 27 === r$1 || r$1 > 127 && r$1 < h) {
										this._dcsParser.put(e$2, i$3, s$3), i$3 = s$3 - 1;
										break;
									}
									break;
								case 14:
									if (s$2 = this._dcsParser.unhook(24 !== r$1 && 26 !== r$1), s$2) return this._preserveStack(6, [], 0, n$1, i$3), s$2;
									27 === r$1 && (n$1 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
									break;
								case 4:
									this._oscParser.start();
									break;
								case 5:
									for (let s$3 = i$3 + 1;; s$3++) if (s$3 >= t$2 || (r$1 = e$2[s$3]) < 32 || r$1 > 127 && r$1 < h) {
										this._oscParser.put(e$2, i$3, s$3), i$3 = s$3 - 1;
										break;
									}
									break;
								case 6:
									if (s$2 = this._oscParser.end(24 !== r$1 && 26 !== r$1), s$2) return this._preserveStack(5, [], 0, n$1, i$3), s$2;
									27 === r$1 && (n$1 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
							}
							this.currentState = 15 & n$1;
						}
					}
				}
				t$1.EscapeSequenceParser = c$1;
			},
			6242: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.OscHandler = t$1.OscParser = void 0;
				const s$1 = i$1(5770), r = i$1(482), n = [];
				t$1.OscParser = class {
					constructor() {
						this._state = 0, this._active = n, this._id = -1, this._handlers = Object.create(null), this._handlerFb = () => {}, this._stack = {
							paused: !1,
							loopPosition: 0,
							fallThrough: !1
						};
					}
					registerHandler(e$2, t$2) {
						void 0 === this._handlers[e$2] && (this._handlers[e$2] = []);
						const i$2 = this._handlers[e$2];
						return i$2.push(t$2), { dispose: () => {
							const e$3 = i$2.indexOf(t$2);
							-1 !== e$3 && i$2.splice(e$3, 1);
						} };
					}
					clearHandler(e$2) {
						this._handlers[e$2] && delete this._handlers[e$2];
					}
					setHandlerFallback(e$2) {
						this._handlerFb = e$2;
					}
					dispose() {
						this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = n;
					}
					reset() {
						if (2 === this._state) for (let e$2 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e$2 >= 0; --e$2) this._active[e$2].end(!1);
						this._stack.paused = !1, this._active = n, this._id = -1, this._state = 0;
					}
					_start() {
						if (this._active = this._handlers[this._id] || n, this._active.length) for (let e$2 = this._active.length - 1; e$2 >= 0; e$2--) this._active[e$2].start();
						else this._handlerFb(this._id, "START");
					}
					_put(e$2, t$2, i$2) {
						if (this._active.length) for (let s$2 = this._active.length - 1; s$2 >= 0; s$2--) this._active[s$2].put(e$2, t$2, i$2);
						else this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e$2, t$2, i$2));
					}
					start() {
						this.reset(), this._state = 1;
					}
					put(e$2, t$2, i$2) {
						if (3 !== this._state) {
							if (1 === this._state) for (; t$2 < i$2;) {
								const i$3 = e$2[t$2++];
								if (59 === i$3) {
									this._state = 2, this._start();
									break;
								}
								if (i$3 < 48 || 57 < i$3) return void (this._state = 3);
								-1 === this._id && (this._id = 0), this._id = 10 * this._id + i$3 - 48;
							}
							2 === this._state && i$2 - t$2 > 0 && this._put(e$2, t$2, i$2);
						}
					}
					end(e$2, t$2 = !0) {
						if (0 !== this._state) {
							if (3 !== this._state) if (1 === this._state && this._start(), this._active.length) {
								let i$2 = !1, s$2 = this._active.length - 1, r$1 = !1;
								if (this._stack.paused && (s$2 = this._stack.loopPosition - 1, i$2 = t$2, r$1 = this._stack.fallThrough, this._stack.paused = !1), !r$1 && !1 === i$2) {
									for (; s$2 >= 0 && (i$2 = this._active[s$2].end(e$2), !0 !== i$2); s$2--) if (i$2 instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s$2, this._stack.fallThrough = !1, i$2;
									s$2--;
								}
								for (; s$2 >= 0; s$2--) if (i$2 = this._active[s$2].end(!1), i$2 instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s$2, this._stack.fallThrough = !0, i$2;
							} else this._handlerFb(this._id, "END", e$2);
							this._active = n, this._id = -1, this._state = 0;
						}
					}
				}, t$1.OscHandler = class {
					constructor(e$2) {
						this._handler = e$2, this._data = "", this._hitLimit = !1;
					}
					start() {
						this._data = "", this._hitLimit = !1;
					}
					put(e$2, t$2, i$2) {
						this._hitLimit || (this._data += (0, r.utf32ToString)(e$2, t$2, i$2), this._data.length > s$1.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
					}
					end(e$2) {
						let t$2 = !1;
						if (this._hitLimit) t$2 = !1;
						else if (e$2 && (t$2 = this._handler(this._data), t$2 instanceof Promise)) return t$2.then(((e$3) => (this._data = "", this._hitLimit = !1, e$3)));
						return this._data = "", this._hitLimit = !1, t$2;
					}
				};
			},
			8742: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.Params = void 0;
				const i$1 = 2147483647;
				class s$1 {
					static fromArray(e$2) {
						const t$2 = new s$1();
						if (!e$2.length) return t$2;
						for (let i$2 = Array.isArray(e$2[0]) ? 1 : 0; i$2 < e$2.length; ++i$2) {
							const s$2 = e$2[i$2];
							if (Array.isArray(s$2)) for (let e$3 = 0; e$3 < s$2.length; ++e$3) t$2.addSubParam(s$2[e$3]);
							else t$2.addParam(s$2);
						}
						return t$2;
					}
					constructor(e$2 = 32, t$2 = 32) {
						if (this.maxLength = e$2, this.maxSubParamsLength = t$2, t$2 > 256) throw new Error("maxSubParamsLength must not be greater than 256");
						this.params = new Int32Array(e$2), this.length = 0, this._subParams = new Int32Array(t$2), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e$2), this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
					}
					clone() {
						const e$2 = new s$1(this.maxLength, this.maxSubParamsLength);
						return e$2.params.set(this.params), e$2.length = this.length, e$2._subParams.set(this._subParams), e$2._subParamsLength = this._subParamsLength, e$2._subParamsIdx.set(this._subParamsIdx), e$2._rejectDigits = this._rejectDigits, e$2._rejectSubDigits = this._rejectSubDigits, e$2._digitIsSub = this._digitIsSub, e$2;
					}
					toArray() {
						const e$2 = [];
						for (let t$2 = 0; t$2 < this.length; ++t$2) {
							e$2.push(this.params[t$2]);
							const i$2 = this._subParamsIdx[t$2] >> 8, s$2 = 255 & this._subParamsIdx[t$2];
							s$2 - i$2 > 0 && e$2.push(Array.prototype.slice.call(this._subParams, i$2, s$2));
						}
						return e$2;
					}
					reset() {
						this.length = 0, this._subParamsLength = 0, this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
					}
					addParam(e$2) {
						if (this._digitIsSub = !1, this.length >= this.maxLength) this._rejectDigits = !0;
						else {
							if (e$2 < -1) throw new Error("values lesser than -1 are not allowed");
							this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e$2 > i$1 ? i$1 : e$2;
						}
					}
					addSubParam(e$2) {
						if (this._digitIsSub = !0, this.length) if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = !0;
						else {
							if (e$2 < -1) throw new Error("values lesser than -1 are not allowed");
							this._subParams[this._subParamsLength++] = e$2 > i$1 ? i$1 : e$2, this._subParamsIdx[this.length - 1]++;
						}
					}
					hasSubParams(e$2) {
						return (255 & this._subParamsIdx[e$2]) - (this._subParamsIdx[e$2] >> 8) > 0;
					}
					getSubParams(e$2) {
						const t$2 = this._subParamsIdx[e$2] >> 8, i$2 = 255 & this._subParamsIdx[e$2];
						return i$2 - t$2 > 0 ? this._subParams.subarray(t$2, i$2) : null;
					}
					getSubParamsAll() {
						const e$2 = {};
						for (let t$2 = 0; t$2 < this.length; ++t$2) {
							const i$2 = this._subParamsIdx[t$2] >> 8, s$2 = 255 & this._subParamsIdx[t$2];
							s$2 - i$2 > 0 && (e$2[t$2] = this._subParams.slice(i$2, s$2));
						}
						return e$2;
					}
					addDigit(e$2) {
						let t$2;
						if (this._rejectDigits || !(t$2 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
						const s$2 = this._digitIsSub ? this._subParams : this.params, r = s$2[t$2 - 1];
						s$2[t$2 - 1] = ~r ? Math.min(10 * r + e$2, i$1) : e$2;
					}
				}
				t$1.Params = s$1;
			},
			5741: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.AddonManager = void 0, t$1.AddonManager = class {
					constructor() {
						this._addons = [];
					}
					dispose() {
						for (let e$2 = this._addons.length - 1; e$2 >= 0; e$2--) this._addons[e$2].instance.dispose();
					}
					loadAddon(e$2, t$2) {
						const i$1 = {
							instance: t$2,
							dispose: t$2.dispose,
							isDisposed: !1
						};
						this._addons.push(i$1), t$2.dispose = () => this._wrappedAddonDispose(i$1), t$2.activate(e$2);
					}
					_wrappedAddonDispose(e$2) {
						if (e$2.isDisposed) return;
						let t$2 = -1;
						for (let i$1 = 0; i$1 < this._addons.length; i$1++) if (this._addons[i$1] === e$2) {
							t$2 = i$1;
							break;
						}
						if (-1 === t$2) throw new Error("Could not dispose an addon that has not been loaded");
						e$2.isDisposed = !0, e$2.dispose.apply(e$2.instance), this._addons.splice(t$2, 1);
					}
				};
			},
			8771: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferApiView = void 0;
				const s$1 = i$1(3785), r = i$1(511);
				t$1.BufferApiView = class {
					constructor(e$2, t$2) {
						this._buffer = e$2, this.type = t$2;
					}
					init(e$2) {
						return this._buffer = e$2, this;
					}
					get cursorY() {
						return this._buffer.y;
					}
					get cursorX() {
						return this._buffer.x;
					}
					get viewportY() {
						return this._buffer.ydisp;
					}
					get baseY() {
						return this._buffer.ybase;
					}
					get length() {
						return this._buffer.lines.length;
					}
					getLine(e$2) {
						const t$2 = this._buffer.lines.get(e$2);
						if (t$2) return new s$1.BufferLineApiView(t$2);
					}
					getNullCell() {
						return new r.CellData();
					}
				};
			},
			3785: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferLineApiView = void 0;
				const s$1 = i$1(511);
				t$1.BufferLineApiView = class {
					constructor(e$2) {
						this._line = e$2;
					}
					get isWrapped() {
						return this._line.isWrapped;
					}
					get length() {
						return this._line.length;
					}
					getCell(e$2, t$2) {
						if (!(e$2 < 0 || e$2 >= this._line.length)) return t$2 ? (this._line.loadCell(e$2, t$2), t$2) : this._line.loadCell(e$2, new s$1.CellData());
					}
					translateToString(e$2, t$2, i$2) {
						return this._line.translateToString(e$2, t$2, i$2);
					}
				};
			},
			8285: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferNamespaceApi = void 0;
				const s$1 = i$1(8771), r = i$1(8460), n = i$1(844);
				class o extends n.Disposable {
					constructor(e$2) {
						super(), this._core = e$2, this._onBufferChange = this.register(new r.EventEmitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new s$1.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s$1.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate((() => this._onBufferChange.fire(this.active)));
					}
					get active() {
						if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
						if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
						throw new Error("Active buffer is neither normal nor alternate");
					}
					get normal() {
						return this._normal.init(this._core.buffers.normal);
					}
					get alternate() {
						return this._alternate.init(this._core.buffers.alt);
					}
				}
				t$1.BufferNamespaceApi = o;
			},
			7975: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.ParserApi = void 0, t$1.ParserApi = class {
					constructor(e$2) {
						this._core = e$2;
					}
					registerCsiHandler(e$2, t$2) {
						return this._core.registerCsiHandler(e$2, ((e$3) => t$2(e$3.toArray())));
					}
					addCsiHandler(e$2, t$2) {
						return this.registerCsiHandler(e$2, t$2);
					}
					registerDcsHandler(e$2, t$2) {
						return this._core.registerDcsHandler(e$2, ((e$3, i$1) => t$2(e$3, i$1.toArray())));
					}
					addDcsHandler(e$2, t$2) {
						return this.registerDcsHandler(e$2, t$2);
					}
					registerEscHandler(e$2, t$2) {
						return this._core.registerEscHandler(e$2, t$2);
					}
					addEscHandler(e$2, t$2) {
						return this.registerEscHandler(e$2, t$2);
					}
					registerOscHandler(e$2, t$2) {
						return this._core.registerOscHandler(e$2, t$2);
					}
					addOscHandler(e$2, t$2) {
						return this.registerOscHandler(e$2, t$2);
					}
				};
			},
			7090: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.UnicodeApi = void 0, t$1.UnicodeApi = class {
					constructor(e$2) {
						this._core = e$2;
					}
					register(e$2) {
						this._core.unicodeService.register(e$2);
					}
					get versions() {
						return this._core.unicodeService.versions;
					}
					get activeVersion() {
						return this._core.unicodeService.activeVersion;
					}
					set activeVersion(e$2) {
						this._core.unicodeService.activeVersion = e$2;
					}
				};
			},
			744: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.BufferService = t$1.MINIMUM_ROWS = t$1.MINIMUM_COLS = void 0;
				const n = i$1(8460), o = i$1(844), a = i$1(5295), h = i$1(2585);
				t$1.MINIMUM_COLS = 2, t$1.MINIMUM_ROWS = 1;
				let c$1 = t$1.BufferService = class extends o.Disposable {
					get buffer() {
						return this.buffers.active;
					}
					constructor(e$2) {
						super(), this.isUserScrolling = !1, this._onResize = this.register(new n.EventEmitter()), this.onResize = this._onResize.event, this._onScroll = this.register(new n.EventEmitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(e$2.rawOptions.cols || 0, t$1.MINIMUM_COLS), this.rows = Math.max(e$2.rawOptions.rows || 0, t$1.MINIMUM_ROWS), this.buffers = this.register(new a.BufferSet(e$2, this));
					}
					resize(e$2, t$2) {
						this.cols = e$2, this.rows = t$2, this.buffers.resize(e$2, t$2), this._onResize.fire({
							cols: e$2,
							rows: t$2
						});
					}
					reset() {
						this.buffers.reset(), this.isUserScrolling = !1;
					}
					scroll(e$2, t$2 = !1) {
						const i$2 = this.buffer;
						let s$2;
						s$2 = this._cachedBlankLine, s$2 && s$2.length === this.cols && s$2.getFg(0) === e$2.fg && s$2.getBg(0) === e$2.bg || (s$2 = i$2.getBlankLine(e$2, t$2), this._cachedBlankLine = s$2), s$2.isWrapped = t$2;
						const r$1 = i$2.ybase + i$2.scrollTop, n$1 = i$2.ybase + i$2.scrollBottom;
						if (0 === i$2.scrollTop) {
							const e$3 = i$2.lines.isFull;
							n$1 === i$2.lines.length - 1 ? e$3 ? i$2.lines.recycle().copyFrom(s$2) : i$2.lines.push(s$2.clone()) : i$2.lines.splice(n$1 + 1, 0, s$2.clone()), e$3 ? this.isUserScrolling && (i$2.ydisp = Math.max(i$2.ydisp - 1, 0)) : (i$2.ybase++, this.isUserScrolling || i$2.ydisp++);
						} else {
							const e$3 = n$1 - r$1 + 1;
							i$2.lines.shiftElements(r$1 + 1, e$3 - 1, -1), i$2.lines.set(n$1, s$2.clone());
						}
						this.isUserScrolling || (i$2.ydisp = i$2.ybase), this._onScroll.fire(i$2.ydisp);
					}
					scrollLines(e$2, t$2, i$2) {
						const s$2 = this.buffer;
						if (e$2 < 0) {
							if (0 === s$2.ydisp) return;
							this.isUserScrolling = !0;
						} else e$2 + s$2.ydisp >= s$2.ybase && (this.isUserScrolling = !1);
						const r$1 = s$2.ydisp;
						s$2.ydisp = Math.max(Math.min(s$2.ydisp + e$2, s$2.ybase), 0), r$1 !== s$2.ydisp && (t$2 || this._onScroll.fire(s$2.ydisp));
					}
				};
				t$1.BufferService = c$1 = s$1([r(0, h.IOptionsService)], c$1);
			},
			7994: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CharsetService = void 0, t$1.CharsetService = class {
					constructor() {
						this.glevel = 0, this._charsets = [];
					}
					reset() {
						this.charset = void 0, this._charsets = [], this.glevel = 0;
					}
					setgLevel(e$2) {
						this.glevel = e$2, this.charset = this._charsets[e$2];
					}
					setgCharset(e$2, t$2) {
						this._charsets[e$2] = t$2, this.glevel === e$2 && (this.charset = t$2);
					}
				};
			},
			1753: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CoreMouseService = void 0;
				const n = i$1(2585), o = i$1(8460), a = i$1(844), h = {
					NONE: {
						events: 0,
						restrict: () => !1
					},
					X10: {
						events: 1,
						restrict: (e$2) => 4 !== e$2.button && 1 === e$2.action && (e$2.ctrl = !1, e$2.alt = !1, e$2.shift = !1, !0)
					},
					VT200: {
						events: 19,
						restrict: (e$2) => 32 !== e$2.action
					},
					DRAG: {
						events: 23,
						restrict: (e$2) => 32 !== e$2.action || 3 !== e$2.button
					},
					ANY: {
						events: 31,
						restrict: (e$2) => !0
					}
				};
				function c$1(e$2, t$2) {
					let i$2 = (e$2.ctrl ? 16 : 0) | (e$2.shift ? 4 : 0) | (e$2.alt ? 8 : 0);
					return 4 === e$2.button ? (i$2 |= 64, i$2 |= e$2.action) : (i$2 |= 3 & e$2.button, 4 & e$2.button && (i$2 |= 64), 8 & e$2.button && (i$2 |= 128), 32 === e$2.action ? i$2 |= 32 : 0 !== e$2.action || t$2 || (i$2 |= 3)), i$2;
				}
				const l = String.fromCharCode, d = {
					DEFAULT: (e$2) => {
						const t$2 = [
							c$1(e$2, !1) + 32,
							e$2.col + 32,
							e$2.row + 32
						];
						return t$2[0] > 255 || t$2[1] > 255 || t$2[2] > 255 ? "" : `[M${l(t$2[0])}${l(t$2[1])}${l(t$2[2])}`;
					},
					SGR: (e$2) => {
						const t$2 = 0 === e$2.action && 4 !== e$2.button ? "m" : "M";
						return `[<${c$1(e$2, !0)};${e$2.col};${e$2.row}${t$2}`;
					},
					SGR_PIXELS: (e$2) => {
						const t$2 = 0 === e$2.action && 4 !== e$2.button ? "m" : "M";
						return `[<${c$1(e$2, !0)};${e$2.x};${e$2.y}${t$2}`;
					}
				};
				let _ = t$1.CoreMouseService = class extends a.Disposable {
					constructor(e$2, t$2) {
						super(), this._bufferService = e$2, this._coreService = t$2, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new o.EventEmitter()), this.onProtocolChange = this._onProtocolChange.event;
						for (const e$3 of Object.keys(h)) this.addProtocol(e$3, h[e$3]);
						for (const e$3 of Object.keys(d)) this.addEncoding(e$3, d[e$3]);
						this.reset();
					}
					addProtocol(e$2, t$2) {
						this._protocols[e$2] = t$2;
					}
					addEncoding(e$2, t$2) {
						this._encodings[e$2] = t$2;
					}
					get activeProtocol() {
						return this._activeProtocol;
					}
					get areMouseEventsActive() {
						return 0 !== this._protocols[this._activeProtocol].events;
					}
					set activeProtocol(e$2) {
						if (!this._protocols[e$2]) throw new Error(`unknown protocol "${e$2}"`);
						this._activeProtocol = e$2, this._onProtocolChange.fire(this._protocols[e$2].events);
					}
					get activeEncoding() {
						return this._activeEncoding;
					}
					set activeEncoding(e$2) {
						if (!this._encodings[e$2]) throw new Error(`unknown encoding "${e$2}"`);
						this._activeEncoding = e$2;
					}
					reset() {
						this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
					}
					triggerMouseEvent(e$2) {
						if (e$2.col < 0 || e$2.col >= this._bufferService.cols || e$2.row < 0 || e$2.row >= this._bufferService.rows) return !1;
						if (4 === e$2.button && 32 === e$2.action) return !1;
						if (3 === e$2.button && 32 !== e$2.action) return !1;
						if (4 !== e$2.button && (2 === e$2.action || 3 === e$2.action)) return !1;
						if (e$2.col++, e$2.row++, 32 === e$2.action && this._lastEvent && this._equalEvents(this._lastEvent, e$2, "SGR_PIXELS" === this._activeEncoding)) return !1;
						if (!this._protocols[this._activeProtocol].restrict(e$2)) return !1;
						const t$2 = this._encodings[this._activeEncoding](e$2);
						return t$2 && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t$2) : this._coreService.triggerDataEvent(t$2, !0)), this._lastEvent = e$2, !0;
					}
					explainEvents(e$2) {
						return {
							down: !!(1 & e$2),
							up: !!(2 & e$2),
							drag: !!(4 & e$2),
							move: !!(8 & e$2),
							wheel: !!(16 & e$2)
						};
					}
					_equalEvents(e$2, t$2, i$2) {
						if (i$2) {
							if (e$2.x !== t$2.x) return !1;
							if (e$2.y !== t$2.y) return !1;
						} else {
							if (e$2.col !== t$2.col) return !1;
							if (e$2.row !== t$2.row) return !1;
						}
						return e$2.button === t$2.button && e$2.action === t$2.action && e$2.ctrl === t$2.ctrl && e$2.alt === t$2.alt && e$2.shift === t$2.shift;
					}
				};
				t$1.CoreMouseService = _ = s$1([r(0, n.IBufferService), r(1, n.ICoreService)], _);
			},
			6975: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.CoreService = void 0;
				const n = i$1(1439), o = i$1(8460), a = i$1(844), h = i$1(2585), c$1 = Object.freeze({ insertMode: !1 }), l = Object.freeze({
					applicationCursorKeys: !1,
					applicationKeypad: !1,
					bracketedPasteMode: !1,
					origin: !1,
					reverseWraparound: !1,
					sendFocus: !1,
					wraparound: !0
				});
				let d = t$1.CoreService = class extends a.Disposable {
					constructor(e$2, t$2, i$2) {
						super(), this._bufferService = e$2, this._logService = t$2, this._optionsService = i$2, this.isCursorInitialized = !1, this.isCursorHidden = !1, this._onData = this.register(new o.EventEmitter()), this.onData = this._onData.event, this._onUserInput = this.register(new o.EventEmitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new o.EventEmitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new o.EventEmitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n.clone)(c$1), this.decPrivateModes = (0, n.clone)(l);
					}
					reset() {
						this.modes = (0, n.clone)(c$1), this.decPrivateModes = (0, n.clone)(l);
					}
					triggerDataEvent(e$2, t$2 = !1) {
						if (this._optionsService.rawOptions.disableStdin) return;
						const i$2 = this._bufferService.buffer;
						t$2 && this._optionsService.rawOptions.scrollOnUserInput && i$2.ybase !== i$2.ydisp && this._onRequestScrollToBottom.fire(), t$2 && this._onUserInput.fire(), this._logService.debug(`sending data "${e$2}"`, (() => e$2.split("").map(((e$3) => e$3.charCodeAt(0))))), this._onData.fire(e$2);
					}
					triggerBinaryEvent(e$2) {
						this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e$2}"`, (() => e$2.split("").map(((e$3) => e$3.charCodeAt(0))))), this._onBinary.fire(e$2));
					}
				};
				t$1.CoreService = d = s$1([
					r(0, h.IBufferService),
					r(1, h.ILogService),
					r(2, h.IOptionsService)
				], d);
			},
			9074: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.DecorationService = void 0;
				const s$1 = i$1(8055), r = i$1(8460), n = i$1(844), o = i$1(6106);
				let a = 0, h = 0;
				class c$1 extends n.Disposable {
					get decorations() {
						return this._decorations.values();
					}
					constructor() {
						super(), this._decorations = new o.SortedList(((e$2) => e$2?.marker.line)), this._onDecorationRegistered = this.register(new r.EventEmitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new r.EventEmitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n.toDisposable)((() => this.reset())));
					}
					registerDecoration(e$2) {
						if (e$2.marker.isDisposed) return;
						const t$2 = new l(e$2);
						if (t$2) {
							const e$3 = t$2.marker.onDispose((() => t$2.dispose()));
							t$2.onDispose((() => {
								t$2 && (this._decorations.delete(t$2) && this._onDecorationRemoved.fire(t$2), e$3.dispose());
							})), this._decorations.insert(t$2), this._onDecorationRegistered.fire(t$2);
						}
						return t$2;
					}
					reset() {
						for (const e$2 of this._decorations.values()) e$2.dispose();
						this._decorations.clear();
					}
					*getDecorationsAtCell(e$2, t$2, i$2) {
						let s$2 = 0, r$1 = 0;
						for (const n$1 of this._decorations.getKeyIterator(t$2)) s$2 = n$1.options.x ?? 0, r$1 = s$2 + (n$1.options.width ?? 1), e$2 >= s$2 && e$2 < r$1 && (!i$2 || (n$1.options.layer ?? "bottom") === i$2) && (yield n$1);
					}
					forEachDecorationAtCell(e$2, t$2, i$2, s$2) {
						this._decorations.forEachByKey(t$2, ((t$3) => {
							a = t$3.options.x ?? 0, h = a + (t$3.options.width ?? 1), e$2 >= a && e$2 < h && (!i$2 || (t$3.options.layer ?? "bottom") === i$2) && s$2(t$3);
						}));
					}
				}
				t$1.DecorationService = c$1;
				class l extends n.Disposable {
					get isDisposed() {
						return this._isDisposed;
					}
					get backgroundColorRGB() {
						return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s$1.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
					}
					get foregroundColorRGB() {
						return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s$1.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
					}
					constructor(e$2) {
						super(), this.options = e$2, this.onRenderEmitter = this.register(new r.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e$2.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
					}
					dispose() {
						this._onDispose.fire(), super.dispose();
					}
				}
			},
			4348: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.InstantiationService = t$1.ServiceCollection = void 0;
				const s$1 = i$1(2585), r = i$1(8343);
				class n {
					constructor(...e$2) {
						this._entries = /* @__PURE__ */ new Map();
						for (const [t$2, i$2] of e$2) this.set(t$2, i$2);
					}
					set(e$2, t$2) {
						const i$2 = this._entries.get(e$2);
						return this._entries.set(e$2, t$2), i$2;
					}
					forEach(e$2) {
						for (const [t$2, i$2] of this._entries.entries()) e$2(t$2, i$2);
					}
					has(e$2) {
						return this._entries.has(e$2);
					}
					get(e$2) {
						return this._entries.get(e$2);
					}
				}
				t$1.ServiceCollection = n, t$1.InstantiationService = class {
					constructor() {
						this._services = new n(), this._services.set(s$1.IInstantiationService, this);
					}
					setService(e$2, t$2) {
						this._services.set(e$2, t$2);
					}
					getService(e$2) {
						return this._services.get(e$2);
					}
					createInstance(e$2, ...t$2) {
						const i$2 = (0, r.getServiceDependencies)(e$2).sort(((e$3, t$3) => e$3.index - t$3.index)), s$2 = [];
						for (const t$3 of i$2) {
							const i$3 = this._services.get(t$3.id);
							if (!i$3) throw new Error(`[createInstance] ${e$2.name} depends on UNKNOWN service ${t$3.id}.`);
							s$2.push(i$3);
						}
						const n$1 = i$2.length > 0 ? i$2[0].index : t$2.length;
						if (t$2.length !== n$1) throw new Error(`[createInstance] First service dependency of ${e$2.name} at position ${n$1 + 1} conflicts with ${t$2.length} static arguments`);
						return new e$2(...[...t$2, ...s$2]);
					}
				};
			},
			7866: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a$1 = e$2.length - 1; a$1 >= 0; a$1--) (r$1 = e$2[a$1]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.traceCall = t$1.setTraceLogger = t$1.LogService = void 0;
				const n = i$1(844), o = i$1(2585), a = {
					trace: o.LogLevelEnum.TRACE,
					debug: o.LogLevelEnum.DEBUG,
					info: o.LogLevelEnum.INFO,
					warn: o.LogLevelEnum.WARN,
					error: o.LogLevelEnum.ERROR,
					off: o.LogLevelEnum.OFF
				};
				let h, c$1 = t$1.LogService = class extends n.Disposable {
					get logLevel() {
						return this._logLevel;
					}
					constructor(e$2) {
						super(), this._optionsService = e$2, this._logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", (() => this._updateLogLevel()))), h = this;
					}
					_updateLogLevel() {
						this._logLevel = a[this._optionsService.rawOptions.logLevel];
					}
					_evalLazyOptionalParams(e$2) {
						for (let t$2 = 0; t$2 < e$2.length; t$2++) "function" == typeof e$2[t$2] && (e$2[t$2] = e$2[t$2]());
					}
					_log(e$2, t$2, i$2) {
						this._evalLazyOptionalParams(i$2), e$2.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + t$2, ...i$2);
					}
					trace(e$2, ...t$2) {
						this._logLevel <= o.LogLevelEnum.TRACE && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e$2, t$2);
					}
					debug(e$2, ...t$2) {
						this._logLevel <= o.LogLevelEnum.DEBUG && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e$2, t$2);
					}
					info(e$2, ...t$2) {
						this._logLevel <= o.LogLevelEnum.INFO && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e$2, t$2);
					}
					warn(e$2, ...t$2) {
						this._logLevel <= o.LogLevelEnum.WARN && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e$2, t$2);
					}
					error(e$2, ...t$2) {
						this._logLevel <= o.LogLevelEnum.ERROR && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e$2, t$2);
					}
				};
				t$1.LogService = c$1 = s$1([r(0, o.IOptionsService)], c$1), t$1.setTraceLogger = function(e$2) {
					h = e$2;
				}, t$1.traceCall = function(e$2, t$2, i$2) {
					if ("function" != typeof i$2.value) throw new Error("not supported");
					const s$2 = i$2.value;
					i$2.value = function(...e$3) {
						if (h.logLevel !== o.LogLevelEnum.TRACE) return s$2.apply(this, e$3);
						h.trace(`GlyphRenderer#${s$2.name}(${e$3.map(((e$4) => JSON.stringify(e$4))).join(", ")})`);
						const t$3 = s$2.apply(this, e$3);
						return h.trace(`GlyphRenderer#${s$2.name} return`, t$3), t$3;
					};
				};
			},
			7302: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.OptionsService = t$1.DEFAULT_OPTIONS = void 0;
				const s$1 = i$1(8460), r = i$1(844);
				t$1.DEFAULT_OPTIONS = {
					cols: 80,
					rows: 24,
					cursorBlink: !1,
					cursorStyle: "block",
					cursorWidth: 1,
					cursorInactiveStyle: "outline",
					customGlyphs: !0,
					drawBoldTextInBrightColors: !0,
					documentOverride: null,
					fastScrollModifier: "alt",
					fastScrollSensitivity: 5,
					fontFamily: "courier-new, courier, monospace",
					fontSize: 15,
					fontWeight: "normal",
					fontWeightBold: "bold",
					ignoreBracketedPasteMode: !1,
					lineHeight: 1,
					letterSpacing: 0,
					linkHandler: null,
					logLevel: "info",
					logger: null,
					scrollback: 1e3,
					scrollOnUserInput: !0,
					scrollSensitivity: 1,
					screenReaderMode: !1,
					smoothScrollDuration: 0,
					macOptionIsMeta: !1,
					macOptionClickForcesSelection: !1,
					minimumContrastRatio: 1,
					disableStdin: !1,
					allowProposedApi: !1,
					allowTransparency: !1,
					tabStopWidth: 8,
					theme: {},
					rescaleOverlappingGlyphs: !1,
					rightClickSelectsWord: i$1(6114).isMac,
					windowOptions: {},
					windowsMode: !1,
					windowsPty: {},
					wordSeparator: " ()[]{}',\"`",
					altClickMovesCursor: !0,
					convertEol: !1,
					termName: "xterm",
					cancelEvents: !1,
					overviewRulerWidth: 0
				};
				const o = [
					"normal",
					"bold",
					"100",
					"200",
					"300",
					"400",
					"500",
					"600",
					"700",
					"800",
					"900"
				];
				class a extends r.Disposable {
					constructor(e$2) {
						super(), this._onOptionChange = this.register(new s$1.EventEmitter()), this.onOptionChange = this._onOptionChange.event;
						const i$2 = { ...t$1.DEFAULT_OPTIONS };
						for (const t$2 in e$2) if (t$2 in i$2) try {
							const s$2 = e$2[t$2];
							i$2[t$2] = this._sanitizeAndValidateOption(t$2, s$2);
						} catch (e$3) {
							console.error(e$3);
						}
						this.rawOptions = i$2, this.options = { ...i$2 }, this._setupOptions(), this.register((0, r.toDisposable)((() => {
							this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
						})));
					}
					onSpecificOptionChange(e$2, t$2) {
						return this.onOptionChange(((i$2) => {
							i$2 === e$2 && t$2(this.rawOptions[e$2]);
						}));
					}
					onMultipleOptionChange(e$2, t$2) {
						return this.onOptionChange(((i$2) => {
							-1 !== e$2.indexOf(i$2) && t$2();
						}));
					}
					_setupOptions() {
						const e$2 = (e$3) => {
							if (!(e$3 in t$1.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e$3}"`);
							return this.rawOptions[e$3];
						}, i$2 = (e$3, i$3) => {
							if (!(e$3 in t$1.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e$3}"`);
							i$3 = this._sanitizeAndValidateOption(e$3, i$3), this.rawOptions[e$3] !== i$3 && (this.rawOptions[e$3] = i$3, this._onOptionChange.fire(e$3));
						};
						for (const t$2 in this.rawOptions) {
							const s$2 = {
								get: e$2.bind(this, t$2),
								set: i$2.bind(this, t$2)
							};
							Object.defineProperty(this.options, t$2, s$2);
						}
					}
					_sanitizeAndValidateOption(e$2, i$2) {
						switch (e$2) {
							case "cursorStyle":
								if (i$2 || (i$2 = t$1.DEFAULT_OPTIONS[e$2]), !function(e$3) {
									return "block" === e$3 || "underline" === e$3 || "bar" === e$3;
								}(i$2)) throw new Error(`"${i$2}" is not a valid value for ${e$2}`);
								break;
							case "wordSeparator":
								i$2 || (i$2 = t$1.DEFAULT_OPTIONS[e$2]);
								break;
							case "fontWeight":
							case "fontWeightBold":
								if ("number" == typeof i$2 && 1 <= i$2 && i$2 <= 1e3) break;
								i$2 = o.includes(i$2) ? i$2 : t$1.DEFAULT_OPTIONS[e$2];
								break;
							case "cursorWidth": i$2 = Math.floor(i$2);
							case "lineHeight":
							case "tabStopWidth":
								if (i$2 < 1) throw new Error(`${e$2} cannot be less than 1, value: ${i$2}`);
								break;
							case "minimumContrastRatio":
								i$2 = Math.max(1, Math.min(21, Math.round(10 * i$2) / 10));
								break;
							case "scrollback":
								if ((i$2 = Math.min(i$2, 4294967295)) < 0) throw new Error(`${e$2} cannot be less than 0, value: ${i$2}`);
								break;
							case "fastScrollSensitivity":
							case "scrollSensitivity":
								if (i$2 <= 0) throw new Error(`${e$2} cannot be less than or equal to 0, value: ${i$2}`);
								break;
							case "rows":
							case "cols":
								if (!i$2 && 0 !== i$2) throw new Error(`${e$2} must be numeric, value: ${i$2}`);
								break;
							case "windowsPty": i$2 = i$2 ?? {};
						}
						return i$2;
					}
				}
				t$1.OptionsService = a;
			},
			2660: function(e$1, t$1, i$1) {
				var s$1 = this && this.__decorate || function(e$2, t$2, i$2, s$2) {
					var r$1, n$1 = arguments.length, o$1 = n$1 < 3 ? t$2 : null === s$2 ? s$2 = Object.getOwnPropertyDescriptor(t$2, i$2) : s$2;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o$1 = Reflect.decorate(e$2, t$2, i$2, s$2);
					else for (var a = e$2.length - 1; a >= 0; a--) (r$1 = e$2[a]) && (o$1 = (n$1 < 3 ? r$1(o$1) : n$1 > 3 ? r$1(t$2, i$2, o$1) : r$1(t$2, i$2)) || o$1);
					return n$1 > 3 && o$1 && Object.defineProperty(t$2, i$2, o$1), o$1;
				}, r = this && this.__param || function(e$2, t$2) {
					return function(i$2, s$2) {
						t$2(i$2, s$2, e$2);
					};
				};
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.OscLinkService = void 0;
				const n = i$1(2585);
				let o = t$1.OscLinkService = class {
					constructor(e$2) {
						this._bufferService = e$2, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
					}
					registerLink(e$2) {
						const t$2 = this._bufferService.buffer;
						if (void 0 === e$2.id) {
							const i$3 = t$2.addMarker(t$2.ybase + t$2.y), s$3 = {
								data: e$2,
								id: this._nextId++,
								lines: [i$3]
							};
							return i$3.onDispose((() => this._removeMarkerFromLink(s$3, i$3))), this._dataByLinkId.set(s$3.id, s$3), s$3.id;
						}
						const i$2 = e$2, s$2 = this._getEntryIdKey(i$2), r$1 = this._entriesWithId.get(s$2);
						if (r$1) return this.addLineToLink(r$1.id, t$2.ybase + t$2.y), r$1.id;
						const n$1 = t$2.addMarker(t$2.ybase + t$2.y), o$1 = {
							id: this._nextId++,
							key: this._getEntryIdKey(i$2),
							data: i$2,
							lines: [n$1]
						};
						return n$1.onDispose((() => this._removeMarkerFromLink(o$1, n$1))), this._entriesWithId.set(o$1.key, o$1), this._dataByLinkId.set(o$1.id, o$1), o$1.id;
					}
					addLineToLink(e$2, t$2) {
						const i$2 = this._dataByLinkId.get(e$2);
						if (i$2 && i$2.lines.every(((e$3) => e$3.line !== t$2))) {
							const e$3 = this._bufferService.buffer.addMarker(t$2);
							i$2.lines.push(e$3), e$3.onDispose((() => this._removeMarkerFromLink(i$2, e$3)));
						}
					}
					getLinkData(e$2) {
						return this._dataByLinkId.get(e$2)?.data;
					}
					_getEntryIdKey(e$2) {
						return `${e$2.id};;${e$2.uri}`;
					}
					_removeMarkerFromLink(e$2, t$2) {
						const i$2 = e$2.lines.indexOf(t$2);
						-1 !== i$2 && (e$2.lines.splice(i$2, 1), 0 === e$2.lines.length && (void 0 !== e$2.data.id && this._entriesWithId.delete(e$2.key), this._dataByLinkId.delete(e$2.id)));
					}
				};
				t$1.OscLinkService = o = s$1([r(0, n.IBufferService)], o);
			},
			8343: (e$1, t$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.createDecorator = t$1.getServiceDependencies = t$1.serviceRegistry = void 0;
				const i$1 = "di$target", s$1 = "di$dependencies";
				t$1.serviceRegistry = /* @__PURE__ */ new Map(), t$1.getServiceDependencies = function(e$2) {
					return e$2[s$1] || [];
				}, t$1.createDecorator = function(e$2) {
					if (t$1.serviceRegistry.has(e$2)) return t$1.serviceRegistry.get(e$2);
					const r = function(e$3, t$2, n) {
						if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
						(function(e$4, t$3, r$1) {
							t$3[i$1] === t$3 ? t$3[s$1].push({
								id: e$4,
								index: r$1
							}) : (t$3[s$1] = [{
								id: e$4,
								index: r$1
							}], t$3[i$1] = t$3);
						})(r, e$3, n);
					};
					return r.toString = () => e$2, t$1.serviceRegistry.set(e$2, r), r;
				};
			},
			2585: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.IDecorationService = t$1.IUnicodeService = t$1.IOscLinkService = t$1.IOptionsService = t$1.ILogService = t$1.LogLevelEnum = t$1.IInstantiationService = t$1.ICharsetService = t$1.ICoreService = t$1.ICoreMouseService = t$1.IBufferService = void 0;
				const s$1 = i$1(8343);
				var r;
				t$1.IBufferService = (0, s$1.createDecorator)("BufferService"), t$1.ICoreMouseService = (0, s$1.createDecorator)("CoreMouseService"), t$1.ICoreService = (0, s$1.createDecorator)("CoreService"), t$1.ICharsetService = (0, s$1.createDecorator)("CharsetService"), t$1.IInstantiationService = (0, s$1.createDecorator)("InstantiationService"), function(e$2) {
					e$2[e$2.TRACE = 0] = "TRACE", e$2[e$2.DEBUG = 1] = "DEBUG", e$2[e$2.INFO = 2] = "INFO", e$2[e$2.WARN = 3] = "WARN", e$2[e$2.ERROR = 4] = "ERROR", e$2[e$2.OFF = 5] = "OFF";
				}(r || (t$1.LogLevelEnum = r = {})), t$1.ILogService = (0, s$1.createDecorator)("LogService"), t$1.IOptionsService = (0, s$1.createDecorator)("OptionsService"), t$1.IOscLinkService = (0, s$1.createDecorator)("OscLinkService"), t$1.IUnicodeService = (0, s$1.createDecorator)("UnicodeService"), t$1.IDecorationService = (0, s$1.createDecorator)("DecorationService");
			},
			1480: (e$1, t$1, i$1) => {
				Object.defineProperty(t$1, "__esModule", { value: !0 }), t$1.UnicodeService = void 0;
				const s$1 = i$1(8460), r = i$1(225);
				class n {
					static extractShouldJoin(e$2) {
						return 0 != (1 & e$2);
					}
					static extractWidth(e$2) {
						return e$2 >> 1 & 3;
					}
					static extractCharKind(e$2) {
						return e$2 >> 3;
					}
					static createPropertyValue(e$2, t$2, i$2 = !1) {
						return (16777215 & e$2) << 3 | (3 & t$2) << 1 | (i$2 ? 1 : 0);
					}
					constructor() {
						this._providers = Object.create(null), this._active = "", this._onChange = new s$1.EventEmitter(), this.onChange = this._onChange.event;
						const e$2 = new r.UnicodeV6();
						this.register(e$2), this._active = e$2.version, this._activeProvider = e$2;
					}
					dispose() {
						this._onChange.dispose();
					}
					get versions() {
						return Object.keys(this._providers);
					}
					get activeVersion() {
						return this._active;
					}
					set activeVersion(e$2) {
						if (!this._providers[e$2]) throw new Error(`unknown Unicode version "${e$2}"`);
						this._active = e$2, this._activeProvider = this._providers[e$2], this._onChange.fire(e$2);
					}
					register(e$2) {
						this._providers[e$2.version] = e$2;
					}
					wcwidth(e$2) {
						return this._activeProvider.wcwidth(e$2);
					}
					getStringCellWidth(e$2) {
						let t$2 = 0, i$2 = 0;
						const s$2 = e$2.length;
						for (let r$1 = 0; r$1 < s$2; ++r$1) {
							let o = e$2.charCodeAt(r$1);
							if (55296 <= o && o <= 56319) {
								if (++r$1 >= s$2) return t$2 + this.wcwidth(o);
								const i$3 = e$2.charCodeAt(r$1);
								56320 <= i$3 && i$3 <= 57343 ? o = 1024 * (o - 55296) + i$3 - 56320 + 65536 : t$2 += this.wcwidth(i$3);
							}
							const a = this.charProperties(o, i$2);
							let h = n.extractWidth(a);
							n.extractShouldJoin(a) && (h -= n.extractWidth(i$2)), t$2 += h, i$2 = a;
						}
						return t$2;
					}
					charProperties(e$2, t$2) {
						return this._activeProvider.charProperties(e$2, t$2);
					}
				}
				t$1.UnicodeService = n;
			}
		}, t = {};
		function i(s$1) {
			var r = t[s$1];
			if (void 0 !== r) return r.exports;
			var n = t[s$1] = { exports: {} };
			return e[s$1].call(n.exports, n, n.exports, i), n.exports;
		}
		var s = {};
		return (() => {
			var e$1 = s;
			Object.defineProperty(e$1, "__esModule", { value: !0 }), e$1.Terminal = void 0;
			const t$1 = i(9042), r = i(3236), n = i(844), o = i(5741), a = i(8285), h = i(7975), c$1 = i(7090), l = ["cols", "rows"];
			class d extends n.Disposable {
				constructor(e$2) {
					super(), this._core = this.register(new r.Terminal(e$2)), this._addonManager = this.register(new o.AddonManager()), this._publicOptions = { ...this._core.options };
					const t$2 = (e$3) => this._core.options[e$3], i$1 = (e$3, t$3) => {
						this._checkReadonlyOptions(e$3), this._core.options[e$3] = t$3;
					};
					for (const e$3 in this._core.options) {
						const s$1 = {
							get: t$2.bind(this, e$3),
							set: i$1.bind(this, e$3)
						};
						Object.defineProperty(this._publicOptions, e$3, s$1);
					}
				}
				_checkReadonlyOptions(e$2) {
					if (l.includes(e$2)) throw new Error(`Option "${e$2}" can only be set in the constructor`);
				}
				_checkProposedApi() {
					if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
				}
				get onBell() {
					return this._core.onBell;
				}
				get onBinary() {
					return this._core.onBinary;
				}
				get onCursorMove() {
					return this._core.onCursorMove;
				}
				get onData() {
					return this._core.onData;
				}
				get onKey() {
					return this._core.onKey;
				}
				get onLineFeed() {
					return this._core.onLineFeed;
				}
				get onRender() {
					return this._core.onRender;
				}
				get onResize() {
					return this._core.onResize;
				}
				get onScroll() {
					return this._core.onScroll;
				}
				get onSelectionChange() {
					return this._core.onSelectionChange;
				}
				get onTitleChange() {
					return this._core.onTitleChange;
				}
				get onWriteParsed() {
					return this._core.onWriteParsed;
				}
				get element() {
					return this._core.element;
				}
				get parser() {
					return this._parser || (this._parser = new h.ParserApi(this._core)), this._parser;
				}
				get unicode() {
					return this._checkProposedApi(), new c$1.UnicodeApi(this._core);
				}
				get textarea() {
					return this._core.textarea;
				}
				get rows() {
					return this._core.rows;
				}
				get cols() {
					return this._core.cols;
				}
				get buffer() {
					return this._buffer || (this._buffer = this.register(new a.BufferNamespaceApi(this._core))), this._buffer;
				}
				get markers() {
					return this._checkProposedApi(), this._core.markers;
				}
				get modes() {
					const e$2 = this._core.coreService.decPrivateModes;
					let t$2 = "none";
					switch (this._core.coreMouseService.activeProtocol) {
						case "X10":
							t$2 = "x10";
							break;
						case "VT200":
							t$2 = "vt200";
							break;
						case "DRAG":
							t$2 = "drag";
							break;
						case "ANY": t$2 = "any";
					}
					return {
						applicationCursorKeysMode: e$2.applicationCursorKeys,
						applicationKeypadMode: e$2.applicationKeypad,
						bracketedPasteMode: e$2.bracketedPasteMode,
						insertMode: this._core.coreService.modes.insertMode,
						mouseTrackingMode: t$2,
						originMode: e$2.origin,
						reverseWraparoundMode: e$2.reverseWraparound,
						sendFocusMode: e$2.sendFocus,
						wraparoundMode: e$2.wraparound
					};
				}
				get options() {
					return this._publicOptions;
				}
				set options(e$2) {
					for (const t$2 in e$2) this._publicOptions[t$2] = e$2[t$2];
				}
				blur() {
					this._core.blur();
				}
				focus() {
					this._core.focus();
				}
				input(e$2, t$2 = !0) {
					this._core.input(e$2, t$2);
				}
				resize(e$2, t$2) {
					this._verifyIntegers(e$2, t$2), this._core.resize(e$2, t$2);
				}
				open(e$2) {
					this._core.open(e$2);
				}
				attachCustomKeyEventHandler(e$2) {
					this._core.attachCustomKeyEventHandler(e$2);
				}
				attachCustomWheelEventHandler(e$2) {
					this._core.attachCustomWheelEventHandler(e$2);
				}
				registerLinkProvider(e$2) {
					return this._core.registerLinkProvider(e$2);
				}
				registerCharacterJoiner(e$2) {
					return this._checkProposedApi(), this._core.registerCharacterJoiner(e$2);
				}
				deregisterCharacterJoiner(e$2) {
					this._checkProposedApi(), this._core.deregisterCharacterJoiner(e$2);
				}
				registerMarker(e$2 = 0) {
					return this._verifyIntegers(e$2), this._core.registerMarker(e$2);
				}
				registerDecoration(e$2) {
					return this._checkProposedApi(), this._verifyPositiveIntegers(e$2.x ?? 0, e$2.width ?? 0, e$2.height ?? 0), this._core.registerDecoration(e$2);
				}
				hasSelection() {
					return this._core.hasSelection();
				}
				select(e$2, t$2, i$1) {
					this._verifyIntegers(e$2, t$2, i$1), this._core.select(e$2, t$2, i$1);
				}
				getSelection() {
					return this._core.getSelection();
				}
				getSelectionPosition() {
					return this._core.getSelectionPosition();
				}
				clearSelection() {
					this._core.clearSelection();
				}
				selectAll() {
					this._core.selectAll();
				}
				selectLines(e$2, t$2) {
					this._verifyIntegers(e$2, t$2), this._core.selectLines(e$2, t$2);
				}
				dispose() {
					super.dispose();
				}
				scrollLines(e$2) {
					this._verifyIntegers(e$2), this._core.scrollLines(e$2);
				}
				scrollPages(e$2) {
					this._verifyIntegers(e$2), this._core.scrollPages(e$2);
				}
				scrollToTop() {
					this._core.scrollToTop();
				}
				scrollToBottom() {
					this._core.scrollToBottom();
				}
				scrollToLine(e$2) {
					this._verifyIntegers(e$2), this._core.scrollToLine(e$2);
				}
				clear() {
					this._core.clear();
				}
				write(e$2, t$2) {
					this._core.write(e$2, t$2);
				}
				writeln(e$2, t$2) {
					this._core.write(e$2), this._core.write("\r\n", t$2);
				}
				paste(e$2) {
					this._core.paste(e$2);
				}
				refresh(e$2, t$2) {
					this._verifyIntegers(e$2, t$2), this._core.refresh(e$2, t$2);
				}
				reset() {
					this._core.reset();
				}
				clearTextureAtlas() {
					this._core.clearTextureAtlas();
				}
				loadAddon(e$2) {
					this._addonManager.loadAddon(this, e$2);
				}
				static get strings() {
					return t$1;
				}
				_verifyIntegers(...e$2) {
					for (const t$2 of e$2) if (t$2 === Infinity || isNaN(t$2) || t$2 % 1 != 0) throw new Error("This API only accepts integers");
				}
				_verifyPositiveIntegers(...e$2) {
					for (const t$2 of e$2) if (t$2 && (t$2 === Infinity || isNaN(t$2) || t$2 % 1 != 0 || t$2 < 0)) throw new Error("This API only accepts positive integers");
				}
			}
			e$1.Terminal = d;
		})(), s;
	})()));
}) });

//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());

//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
const toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};

//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};

//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
const LucideContext = (0, react.createContext)({});
const useLucideContext = () => (0, react.useContext)(LucideContext);

//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
const Icon = (0, react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode,...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});

//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
const createLucideIcon = (iconName, iconNode) => {
	const Component = (0, react.forwardRef)(({ className,...props }, ref) => (0, react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/activity.mjs
const __iconNode$9 = [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]];
const Activity = createLucideIcon("activity", __iconNode$9);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/blocks.mjs
const __iconNode$8 = [["path", {
	d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
	key: "1ah6g2"
}], ["rect", {
	x: "14",
	y: "2",
	width: "8",
	height: "8",
	rx: "1",
	key: "88lufb"
}]];
const Blocks = createLucideIcon("blocks", __iconNode$8);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
const __iconNode$7 = [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$7);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
const __iconNode$6 = [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$6);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/eraser.mjs
const __iconNode$5 = [["path", {
	d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
	key: "g5wo59"
}], ["path", {
	d: "m5.082 11.09 8.828 8.828",
	key: "1wx5vj"
}]];
const Eraser = createLucideIcon("eraser", __iconNode$5);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/folder-tree.mjs
const __iconNode$4 = [
	["path", {
		d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
		key: "hod4my"
	}],
	["path", {
		d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
		key: "w4yl2u"
	}],
	["path", {
		d: "M3 5a2 2 0 0 0 2 2h3",
		key: "f2jnh7"
	}],
	["path", {
		d: "M3 3v13a2 2 0 0 0 2 2h3",
		key: "k8epm1"
	}]
];
const FolderTree = createLucideIcon("folder-tree", __iconNode$4);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/git-branch.mjs
const __iconNode$3 = [
	["path", {
		d: "M15 6a9 9 0 0 0-9 9V3",
		key: "1cii5b"
	}],
	["circle", {
		cx: "18",
		cy: "6",
		r: "3",
		key: "1h7g24"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}]
];
const GitBranch = createLucideIcon("git-branch", __iconNode$3);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs
const __iconNode$2 = [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/terminal.mjs
const __iconNode$1 = [["path", {
	d: "M12 19h8",
	key: "baeox8"
}], ["path", {
	d: "m4 17 6-6-6-6",
	key: "1yngyt"
}]];
const Terminal = createLucideIcon("terminal", __iconNode$1);

//#endregion
//#region node_modules/lucide-react/dist/esm/icons/x.mjs
const __iconNode = [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]];
const X = createLucideIcon("x", __iconNode);

//#endregion
//#region node_modules/highlight.js/lib/core.js
var require_core = /* @__PURE__ */ __commonJS({ "node_modules/highlight.js/lib/core.js": ((exports, module) => {
	function deepFreeze(obj) {
		if (obj instanceof Map) obj.clear = obj.delete = obj.set = function() {
			throw new Error("map is read-only");
		};
		else if (obj instanceof Set) obj.add = obj.clear = obj.delete = function() {
			throw new Error("set is read-only");
		};
		Object.freeze(obj);
		Object.getOwnPropertyNames(obj).forEach((name) => {
			const prop = obj[name];
			const type = typeof prop;
			if ((type === "object" || type === "function") && !Object.isFrozen(prop)) deepFreeze(prop);
		});
		return obj;
	}
	/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
	/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
	/** @implements CallbackResponse */
	var Response = class {
		/**
		* @param {CompiledMode} mode
		*/
		constructor(mode) {
			if (mode.data === void 0) mode.data = {};
			this.data = mode.data;
			this.isMatchIgnored = false;
		}
		ignoreMatch() {
			this.isMatchIgnored = true;
		}
	};
	/**
	* @param {string} value
	* @returns {string}
	*/
	function escapeHTML(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	}
	/**
	* performs a shallow merge of multiple objects into one
	*
	* @template T
	* @param {T} original
	* @param {Record<string,any>[]} objects
	* @returns {T} a single new object
	*/
	function inherit$1(original, ...objects) {
		/** @type Record<string,any> */
		const result = Object.create(null);
		for (const key in original) result[key] = original[key];
		objects.forEach(function(obj) {
			for (const key in obj) result[key] = obj[key];
		});
		return result;
	}
	/**
	* @typedef {object} Renderer
	* @property {(text: string) => void} addText
	* @property {(node: Node) => void} openNode
	* @property {(node: Node) => void} closeNode
	* @property {() => string} value
	*/
	/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
	/** @typedef {{walk: (r: Renderer) => void}} Tree */
	/** */
	const SPAN_CLOSE = "</span>";
	/**
	* Determines if a node needs to be wrapped in <span>
	*
	* @param {Node} node */
	const emitsWrappingTags = (node) => {
		return !!node.scope;
	};
	/**
	*
	* @param {string} name
	* @param {{prefix:string}} options
	*/
	const scopeToCSSClass = (name, { prefix }) => {
		if (name.startsWith("language:")) return name.replace("language:", "language-");
		if (name.includes(".")) {
			const pieces = name.split(".");
			return [`${prefix}${pieces.shift()}`, ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)].join(" ");
		}
		return `${prefix}${name}`;
	};
	/** @type {Renderer} */
	var HTMLRenderer = class {
		/**
		* Creates a new HTMLRenderer
		*
		* @param {Tree} parseTree - the parse tree (must support `walk` API)
		* @param {{classPrefix: string}} options
		*/
		constructor(parseTree, options) {
			this.buffer = "";
			this.classPrefix = options.classPrefix;
			parseTree.walk(this);
		}
		/**
		* Adds texts to the output stream
		*
		* @param {string} text */
		addText(text) {
			this.buffer += escapeHTML(text);
		}
		/**
		* Adds a node open to the output stream (if needed)
		*
		* @param {Node} node */
		openNode(node) {
			if (!emitsWrappingTags(node)) return;
			const className = scopeToCSSClass(node.scope, { prefix: this.classPrefix });
			this.span(className);
		}
		/**
		* Adds a node close to the output stream (if needed)
		*
		* @param {Node} node */
		closeNode(node) {
			if (!emitsWrappingTags(node)) return;
			this.buffer += SPAN_CLOSE;
		}
		/**
		* returns the accumulated buffer
		*/
		value() {
			return this.buffer;
		}
		/**
		* Builds a span element
		*
		* @param {string} className */
		span(className) {
			this.buffer += `<span class="${className}">`;
		}
	};
	/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
	/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
	/** @typedef {import('highlight.js').Emitter} Emitter */
	/**  */
	/** @returns {DataNode} */
	const newNode = (opts = {}) => {
		/** @type DataNode */
		const result = { children: [] };
		Object.assign(result, opts);
		return result;
	};
	var TokenTree = class TokenTree {
		constructor() {
			/** @type DataNode */
			this.rootNode = newNode();
			this.stack = [this.rootNode];
		}
		get top() {
			return this.stack[this.stack.length - 1];
		}
		get root() {
			return this.rootNode;
		}
		/** @param {Node} node */
		add(node) {
			this.top.children.push(node);
		}
		/** @param {string} scope */
		openNode(scope) {
			/** @type Node */
			const node = newNode({ scope });
			this.add(node);
			this.stack.push(node);
		}
		closeNode() {
			if (this.stack.length > 1) return this.stack.pop();
		}
		closeAllNodes() {
			while (this.closeNode());
		}
		toJSON() {
			return JSON.stringify(this.rootNode, null, 4);
		}
		/**
		* @typedef { import("./html_renderer").Renderer } Renderer
		* @param {Renderer} builder
		*/
		walk(builder) {
			return this.constructor._walk(builder, this.rootNode);
		}
		/**
		* @param {Renderer} builder
		* @param {Node} node
		*/
		static _walk(builder, node) {
			if (typeof node === "string") builder.addText(node);
			else if (node.children) {
				builder.openNode(node);
				node.children.forEach((child) => this._walk(builder, child));
				builder.closeNode(node);
			}
			return builder;
		}
		/**
		* @param {Node} node
		*/
		static _collapse(node) {
			if (typeof node === "string") return;
			if (!node.children) return;
			if (node.children.every((el) => typeof el === "string")) node.children = [node.children.join("")];
			else node.children.forEach((child) => {
				TokenTree._collapse(child);
			});
		}
	};
	/**
	Currently this is all private API, but this is the minimal API necessary
	that an Emitter must implement to fully support the parser.
	
	Minimal interface:
	
	- addText(text)
	- __addSublanguage(emitter, subLanguageName)
	- startScope(scope)
	- endScope()
	- finalize()
	- toHTML()
	
	*/
	/**
	* @implements {Emitter}
	*/
	var TokenTreeEmitter = class extends TokenTree {
		/**
		* @param {*} options
		*/
		constructor(options) {
			super();
			this.options = options;
		}
		/**
		* @param {string} text
		*/
		addText(text) {
			if (text === "") return;
			this.add(text);
		}
		/** @param {string} scope */
		startScope(scope) {
			this.openNode(scope);
		}
		endScope() {
			this.closeNode();
		}
		/**
		* @param {Emitter & {root: DataNode}} emitter
		* @param {string} name
		*/
		__addSublanguage(emitter, name) {
			/** @type DataNode */
			const node = emitter.root;
			if (name) node.scope = `language:${name}`;
			this.add(node);
		}
		toHTML() {
			return new HTMLRenderer(this, this.options).value();
		}
		finalize() {
			this.closeAllNodes();
			return true;
		}
	};
	/**
	* @param {string} value
	* @returns {RegExp}
	* */
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function source(re) {
		if (!re) return null;
		if (typeof re === "string") return re;
		return re.source;
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function lookahead(re) {
		return concat("(?=", re, ")");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function anyNumberOfTimes(re) {
		return concat("(?:", re, ")*");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function optional(re) {
		return concat("(?:", re, ")?");
	}
	/**
	* @param {...(RegExp | string) } args
	* @returns {string}
	*/
	function concat(...args) {
		return args.map((x) => source(x)).join("");
	}
	/**
	* @param { Array<string | RegExp | Object> } args
	* @returns {object}
	*/
	function stripOptionsFromArgs(args) {
		const opts = args[args.length - 1];
		if (typeof opts === "object" && opts.constructor === Object) {
			args.splice(args.length - 1, 1);
			return opts;
		} else return {};
	}
	/** @typedef { {capture?: boolean} } RegexEitherOptions */
	/**
	* Any of the passed expresssions may match
	*
	* Creates a huge this | this | that | that match
	* @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
	* @returns {string}
	*/
	function either(...args) {
		return "(" + (stripOptionsFromArgs(args).capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
	}
	/**
	* @param {RegExp | string} re
	* @returns {number}
	*/
	function countMatchGroups(re) {
		return (/* @__PURE__ */ new RegExp(re.toString() + "|")).exec("").length - 1;
	}
	/**
	* Does lexeme start with a regular expression match at the beginning
	* @param {RegExp} re
	* @param {string} lexeme
	*/
	function startsWith(re, lexeme) {
		const match = re && re.exec(lexeme);
		return match && match.index === 0;
	}
	const BACKREF_RE = new RegExp(either(/\[(?:[^\\\]]|\\.)*\]/, /\(\?<(?![=!])[^>]+>/, /\(\?'[^']+'/, /\(\??/, /\\([1-9][0-9]*)/, /\\./));
	/**
	* @param {(string | RegExp)[]} regexps
	* @param {{joinWith: string}} opts
	* @returns {string}
	*/
	function _rewriteBackreferences(regexps, { joinWith }) {
		let numCaptures = 0;
		return regexps.map((regex) => {
			numCaptures += 1;
			const offset = numCaptures;
			let re = source(regex);
			let out = "";
			while (re.length > 0) {
				const match = BACKREF_RE.exec(re);
				if (!match) {
					out += re;
					break;
				}
				out += re.substring(0, match.index);
				re = re.substring(match.index + match[0].length);
				if (match[0][0] === "\\" && match[1]) out += "\\" + String(Number(match[1]) + offset);
				else {
					out += match[0];
					if (match[0] === "(" || /^\(\?[<']/.test(match[0])) numCaptures++;
				}
			}
			return out;
		}).map((re) => `(${re})`).join(joinWith);
	}
	/** @typedef {import('highlight.js').Mode} Mode */
	/** @typedef {import('highlight.js').ModeCallback} ModeCallback */
	const MATCH_NOTHING_RE = /\b\B/;
	const IDENT_RE$2 = "[a-zA-Z]\\w*";
	const UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
	const NUMBER_RE = "\\b\\d+(\\.\\d+)?";
	const C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
	const BINARY_NUMBER_RE = "\\b(0b[01]+)";
	const RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	/**
	* @param { Partial<Mode> & {binary?: string | RegExp} } opts
	*/
	const SHEBANG = (opts = {}) => {
		const beginShebang = /^#![ ]*\//;
		if (opts.binary) opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
		return inherit$1({
			scope: "meta",
			begin: beginShebang,
			end: /$/,
			relevance: 0,
			"on:begin": (m, resp) => {
				if (m.index !== 0) resp.ignoreMatch();
			}
		}, opts);
	};
	const BACKSLASH_ESCAPE = {
		begin: "\\\\[\\s\\S]",
		relevance: 0
	};
	const APOS_STRING_MODE = {
		scope: "string",
		begin: "'",
		end: "'",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	const QUOTE_STRING_MODE = {
		scope: "string",
		begin: "\"",
		end: "\"",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	const PHRASAL_WORDS_MODE = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ };
	/**
	* Creates a comment mode
	*
	* @param {string | RegExp} begin
	* @param {string | RegExp} end
	* @param {Mode | {}} [modeOptions]
	* @returns {Partial<Mode>}
	*/
	const COMMENT = function(begin, end, modeOptions = {}) {
		const mode = inherit$1({
			scope: "comment",
			begin,
			end,
			contains: []
		}, modeOptions);
		mode.contains.push({
			scope: "doctag",
			begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
			end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
			excludeBegin: true,
			relevance: 0
		});
		const ENGLISH_WORD = either("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
		mode.contains.push({ begin: concat(/[ ]+/, "(", ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, "){3}") });
		return mode;
	};
	const C_LINE_COMMENT_MODE = COMMENT("//", "$");
	const C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
	const HASH_COMMENT_MODE = COMMENT("#", "$");
	const NUMBER_MODE = {
		scope: "number",
		begin: NUMBER_RE,
		relevance: 0
	};
	const C_NUMBER_MODE = {
		scope: "number",
		begin: C_NUMBER_RE,
		relevance: 0
	};
	const BINARY_NUMBER_MODE = {
		scope: "number",
		begin: BINARY_NUMBER_RE,
		relevance: 0
	};
	const REGEXP_MODE = {
		scope: "regexp",
		begin: /\/(?=[^/\n]*\/)/,
		end: /\/[gimuy]*/,
		contains: [BACKSLASH_ESCAPE, {
			begin: /\[/,
			end: /\]/,
			relevance: 0,
			contains: [BACKSLASH_ESCAPE]
		}]
	};
	const TITLE_MODE = {
		scope: "title",
		begin: IDENT_RE$2,
		relevance: 0
	};
	const UNDERSCORE_TITLE_MODE = {
		scope: "title",
		begin: UNDERSCORE_IDENT_RE,
		relevance: 0
	};
	const METHOD_GUARD = {
		begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
		relevance: 0
	};
	/**
	* Adds end same as begin mechanics to a mode
	*
	* Your mode must include at least a single () match group as that first match
	* group is what is used for comparison
	* @param {Partial<Mode>} mode
	*/
	const END_SAME_AS_BEGIN = function(mode) {
		return Object.assign(mode, {
			"on:begin": (m, resp) => {
				resp.data._beginMatch = m[1];
			},
			"on:end": (m, resp) => {
				if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
			}
		});
	};
	var MODES$1 = /* @__PURE__ */ Object.freeze({
		__proto__: null,
		APOS_STRING_MODE,
		BACKSLASH_ESCAPE,
		BINARY_NUMBER_MODE,
		BINARY_NUMBER_RE,
		COMMENT,
		C_BLOCK_COMMENT_MODE,
		C_LINE_COMMENT_MODE,
		C_NUMBER_MODE,
		C_NUMBER_RE,
		END_SAME_AS_BEGIN,
		HASH_COMMENT_MODE,
		IDENT_RE: IDENT_RE$2,
		MATCH_NOTHING_RE,
		METHOD_GUARD,
		NUMBER_MODE,
		NUMBER_RE,
		PHRASAL_WORDS_MODE,
		QUOTE_STRING_MODE,
		REGEXP_MODE,
		RE_STARTERS_RE,
		SHEBANG,
		TITLE_MODE,
		UNDERSCORE_IDENT_RE,
		UNDERSCORE_TITLE_MODE
	});
	/**
	@typedef {import('highlight.js').CallbackResponse} CallbackResponse
	@typedef {import('highlight.js').CompilerExt} CompilerExt
	*/
	/**
	* Skip a match if it has a preceding dot
	*
	* This is used for `beginKeywords` to prevent matching expressions such as
	* `bob.keyword.do()`. The mode compiler automatically wires this up as a
	* special _internal_ 'on:begin' callback for modes with `beginKeywords`
	* @param {RegExpMatchArray} match
	* @param {CallbackResponse} response
	*/
	function skipIfHasPrecedingDot(match, response) {
		if (match.input[match.index - 1] === ".") response.ignoreMatch();
	}
	/**
	*
	* @type {CompilerExt}
	*/
	function scopeClassName(mode, _parent) {
		if (mode.className !== void 0) {
			mode.scope = mode.className;
			delete mode.className;
		}
	}
	/**
	* `beginKeywords` syntactic sugar
	* @type {CompilerExt}
	*/
	function beginKeywords(mode, parent) {
		if (!parent) return;
		if (!mode.beginKeywords) return;
		mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
		mode.__beforeBegin = skipIfHasPrecedingDot;
		mode.keywords = mode.keywords || mode.beginKeywords;
		delete mode.beginKeywords;
		if (mode.relevance === void 0) mode.relevance = 0;
	}
	/**
	* Allow `illegal` to contain an array of illegal values
	* @type {CompilerExt}
	*/
	function compileIllegal(mode, _parent) {
		if (!Array.isArray(mode.illegal)) return;
		mode.illegal = either(...mode.illegal);
	}
	/**
	* `match` to match a single expression for readability
	* @type {CompilerExt}
	*/
	function compileMatch(mode, _parent) {
		if (!mode.match) return;
		if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
		mode.begin = mode.match;
		delete mode.match;
	}
	/**
	* provides the default 1 relevance to all modes
	* @type {CompilerExt}
	*/
	function compileRelevance(mode, _parent) {
		if (mode.relevance === void 0) mode.relevance = 1;
	}
	const beforeMatchExt = (mode, parent) => {
		if (!mode.beforeMatch) return;
		if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
		const originalMode = Object.assign({}, mode);
		Object.keys(mode).forEach((key) => {
			delete mode[key];
		});
		mode.keywords = originalMode.keywords;
		mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
		mode.starts = {
			relevance: 0,
			contains: [Object.assign(originalMode, { endsParent: true })]
		};
		mode.relevance = 0;
		delete originalMode.beforeMatch;
	};
	const COMMON_KEYWORDS = [
		"of",
		"and",
		"for",
		"in",
		"not",
		"or",
		"if",
		"then",
		"parent",
		"list",
		"value"
	];
	const DEFAULT_KEYWORD_SCOPE = "keyword";
	/**
	* Given raw keywords from a language definition, compile them.
	*
	* @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
	* @param {boolean} caseInsensitive
	*/
	function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
		/** @type {import("highlight.js/private").KeywordDict} */
		const compiledKeywords = Object.create(null);
		if (typeof rawKeywords === "string") compileList(scopeName, rawKeywords.split(" "));
		else if (Array.isArray(rawKeywords)) compileList(scopeName, rawKeywords);
		else Object.keys(rawKeywords).forEach(function(scopeName$1) {
			Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName$1], caseInsensitive, scopeName$1));
		});
		return compiledKeywords;
		/**
		* Compiles an individual list of keywords
		*
		* Ex: "for if when while|5"
		*
		* @param {string} scopeName
		* @param {Array<string>} keywordList
		*/
		function compileList(scopeName$1, keywordList) {
			if (caseInsensitive) keywordList = keywordList.map((x) => x.toLowerCase());
			keywordList.forEach(function(keyword) {
				const pair = keyword.split("|");
				compiledKeywords[pair[0]] = [scopeName$1, scoreForKeyword(pair[0], pair[1])];
			});
		}
	}
	/**
	* Returns the proper score for a given keyword
	*
	* Also takes into account comment keywords, which will be scored 0 UNLESS
	* another score has been manually assigned.
	* @param {string} keyword
	* @param {string} [providedScore]
	*/
	function scoreForKeyword(keyword, providedScore) {
		if (providedScore) return Number(providedScore);
		return commonKeyword(keyword) ? 0 : 1;
	}
	/**
	* Determines if a given keyword is common or not
	*
	* @param {string} keyword */
	function commonKeyword(keyword) {
		return COMMON_KEYWORDS.includes(keyword.toLowerCase());
	}
	/**
	* @type {Record<string, boolean>}
	*/
	const seenDeprecations = {};
	/**
	* @param {string} message
	*/
	const error = (message) => {
		console.error(message);
	};
	/**
	* @param {string} message
	* @param {any} args
	*/
	const warn = (message, ...args) => {
		console.log(`WARN: ${message}`, ...args);
	};
	/**
	* @param {string} version
	* @param {string} message
	*/
	const deprecated = (version$1, message) => {
		if (seenDeprecations[`${version$1}/${message}`]) return;
		console.log(`Deprecated as of ${version$1}. ${message}`);
		seenDeprecations[`${version$1}/${message}`] = true;
	};
	/**
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	*/
	const MultiClassError = /* @__PURE__ */ new Error();
	/**
	* Renumbers labeled scope names to account for additional inner match
	* groups that otherwise would break everything.
	*
	* Lets say we 3 match scopes:
	*
	*   { 1 => ..., 2 => ..., 3 => ... }
	*
	* So what we need is a clean match like this:
	*
	*   (a)(b)(c) => [ "a", "b", "c" ]
	*
	* But this falls apart with inner match groups:
	*
	* (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
	*
	* Our scopes are now "out of alignment" and we're repeating `b` 3 times.
	* What needs to happen is the numbers are remapped:
	*
	*   { 1 => ..., 2 => ..., 5 => ... }
	*
	* We also need to know that the ONLY groups that should be output
	* are 1, 2, and 5.  This function handles this behavior.
	*
	* @param {CompiledMode} mode
	* @param {Array<RegExp | string>} regexes
	* @param {{key: "beginScope"|"endScope"}} opts
	*/
	function remapScopeNames(mode, regexes, { key }) {
		let offset = 0;
		const scopeNames = mode[key];
		/** @type Record<number,boolean> */
		const emit = {};
		/** @type Record<number,string> */
		const positions = {};
		for (let i = 1; i <= regexes.length; i++) {
			positions[i + offset] = scopeNames[i];
			emit[i + offset] = true;
			offset += countMatchGroups(regexes[i - 1]);
		}
		mode[key] = positions;
		mode[key]._emit = emit;
		mode[key]._multi = true;
	}
	/**
	* @param {CompiledMode} mode
	*/
	function beginMultiClass(mode) {
		if (!Array.isArray(mode.begin)) return;
		if (mode.skip || mode.excludeBegin || mode.returnBegin) {
			error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
			throw MultiClassError;
		}
		if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
			error("beginScope must be object");
			throw MultiClassError;
		}
		remapScopeNames(mode, mode.begin, { key: "beginScope" });
		mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
	}
	/**
	* @param {CompiledMode} mode
	*/
	function endMultiClass(mode) {
		if (!Array.isArray(mode.end)) return;
		if (mode.skip || mode.excludeEnd || mode.returnEnd) {
			error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
			throw MultiClassError;
		}
		if (typeof mode.endScope !== "object" || mode.endScope === null) {
			error("endScope must be object");
			throw MultiClassError;
		}
		remapScopeNames(mode, mode.end, { key: "endScope" });
		mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
	}
	/**
	* this exists only to allow `scope: {}` to be used beside `match:`
	* Otherwise `beginScope` would necessary and that would look weird
	
	{
	match: [ /def/, /\w+/ ]
	scope: { 1: "keyword" , 2: "title" }
	}
	
	* @param {CompiledMode} mode
	*/
	function scopeSugar(mode) {
		if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
			mode.beginScope = mode.scope;
			delete mode.scope;
		}
	}
	/**
	* @param {CompiledMode} mode
	*/
	function MultiClass(mode) {
		scopeSugar(mode);
		if (typeof mode.beginScope === "string") mode.beginScope = { _wrap: mode.beginScope };
		if (typeof mode.endScope === "string") mode.endScope = { _wrap: mode.endScope };
		beginMultiClass(mode);
		endMultiClass(mode);
	}
	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
	*/
	/**
	* Compiles a language definition result
	*
	* Given the raw result of a language definition (Language), compiles this so
	* that it is ready for highlighting code.
	* @param {Language} language
	* @returns {CompiledLanguage}
	*/
	function compileLanguage(language) {
		/**
		* Builds a regex with the case sensitivity of the current language
		*
		* @param {RegExp | string} value
		* @param {boolean} [global]
		*/
		function langRe(value, global) {
			return new RegExp(source(value), "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : ""));
		}
		/**
		Stores multiple regular expressions and allows you to quickly search for
		them all in a string simultaneously - returning the first match.  It does
		this by creating a huge (a|b|c) regex - each individual item wrapped with ()
		and joined by `|` - using match groups to track position.  When a match is
		found checking which position in the array has content allows us to figure
		out which of the original regexes / match groups triggered the match.
		
		The match object itself (the result of `Regex.exec`) is returned but also
		enhanced by merging in any meta-data that was registered with the regex.
		This is how we keep track of which mode matched, and what type of rule
		(`illegal`, `begin`, end, etc).
		*/
		class MultiRegex {
			constructor() {
				this.matchIndexes = {};
				this.regexes = [];
				this.matchAt = 1;
				this.position = 0;
			}
			addRule(re, opts) {
				opts.position = this.position++;
				this.matchIndexes[this.matchAt] = opts;
				this.regexes.push([opts, re]);
				this.matchAt += countMatchGroups(re) + 1;
			}
			compile() {
				if (this.regexes.length === 0) this.exec = () => null;
				this.matcherRe = langRe(_rewriteBackreferences(this.regexes.map((el) => el[1]), { joinWith: "|" }), true);
				this.lastIndex = 0;
			}
			/** @param {string} s */
			exec(s) {
				this.matcherRe.lastIndex = this.lastIndex;
				const match = this.matcherRe.exec(s);
				if (!match) return null;
				const i = match.findIndex((el, i$1) => i$1 > 0 && el !== void 0);
				const matchData = this.matchIndexes[i];
				match.splice(0, i);
				return Object.assign(match, matchData);
			}
		}
		class ResumableMultiRegex {
			constructor() {
				this.rules = [];
				this.multiRegexes = [];
				this.count = 0;
				this.lastIndex = 0;
				this.regexIndex = 0;
			}
			getMatcher(index) {
				if (this.multiRegexes[index]) return this.multiRegexes[index];
				const matcher = new MultiRegex();
				this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
				matcher.compile();
				this.multiRegexes[index] = matcher;
				return matcher;
			}
			resumingScanAtSamePosition() {
				return this.regexIndex !== 0;
			}
			considerAll() {
				this.regexIndex = 0;
			}
			addRule(re, opts) {
				this.rules.push([re, opts]);
				if (opts.type === "begin") this.count++;
			}
			/** @param {string} s */
			exec(s) {
				const m = this.getMatcher(this.regexIndex);
				m.lastIndex = this.lastIndex;
				let result = m.exec(s);
				if (this.resumingScanAtSamePosition()) if (result && result.index === this.lastIndex);
				else {
					const m2 = this.getMatcher(0);
					m2.lastIndex = this.lastIndex + 1;
					result = m2.exec(s);
				}
				if (result) {
					this.regexIndex += result.position + 1;
					if (this.regexIndex === this.count) this.considerAll();
				}
				return result;
			}
		}
		/**
		* Given a mode, builds a huge ResumableMultiRegex that can be used to walk
		* the content and find matches.
		*
		* @param {CompiledMode} mode
		* @returns {ResumableMultiRegex}
		*/
		function buildModeRegex(mode) {
			const mm = new ResumableMultiRegex();
			mode.contains.forEach((term) => mm.addRule(term.begin, {
				rule: term,
				type: "begin"
			}));
			if (mode.terminatorEnd) mm.addRule(mode.terminatorEnd, { type: "end" });
			if (mode.illegal) mm.addRule(mode.illegal, { type: "illegal" });
			return mm;
		}
		/** skip vs abort vs ignore
		*
		* @skip   - The mode is still entered and exited normally (and contains rules apply),
		*           but all content is held and added to the parent buffer rather than being
		*           output when the mode ends.  Mostly used with `sublanguage` to build up
		*           a single large buffer than can be parsed by sublanguage.
		*
		*             - The mode begin ands ends normally.
		*             - Content matched is added to the parent mode buffer.
		*             - The parser cursor is moved forward normally.
		*
		* @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
		*           never matched) but DOES NOT continue to match subsequent `contains`
		*           modes.  Abort is bad/suboptimal because it can result in modes
		*           farther down not getting applied because an earlier rule eats the
		*           content but then aborts.
		*
		*             - The mode does not begin.
		*             - Content matched by `begin` is added to the mode buffer.
		*             - The parser cursor is moved forward accordingly.
		*
		* @ignore - Ignores the mode (as if it never matched) and continues to match any
		*           subsequent `contains` modes.  Ignore isn't technically possible with
		*           the current parser implementation.
		*
		*             - The mode does not begin.
		*             - Content matched by `begin` is ignored.
		*             - The parser cursor is not moved forward.
		*/
		/**
		* Compiles an individual mode
		*
		* This can raise an error if the mode contains certain detectable known logic
		* issues.
		* @param {Mode} mode
		* @param {CompiledMode | null} [parent]
		* @returns {CompiledMode | never}
		*/
		function compileMode(mode, parent) {
			const cmode = mode;
			if (mode.isCompiled) return cmode;
			[
				scopeClassName,
				compileMatch,
				MultiClass,
				beforeMatchExt
			].forEach((ext) => ext(mode, parent));
			language.compilerExtensions.forEach((ext) => ext(mode, parent));
			mode.__beforeBegin = null;
			[
				beginKeywords,
				compileIllegal,
				compileRelevance
			].forEach((ext) => ext(mode, parent));
			mode.isCompiled = true;
			let keywordPattern = null;
			if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
				mode.keywords = Object.assign({}, mode.keywords);
				keywordPattern = mode.keywords.$pattern;
				delete mode.keywords.$pattern;
			}
			keywordPattern = keywordPattern || /\w+/;
			if (mode.keywords) mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
			cmode.keywordPatternRe = langRe(keywordPattern, true);
			if (parent) {
				if (!mode.begin) mode.begin = /\B|\b/;
				cmode.beginRe = langRe(cmode.begin);
				if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
				if (mode.end) cmode.endRe = langRe(cmode.end);
				cmode.terminatorEnd = source(cmode.end) || "";
				if (mode.endsWithParent && parent.terminatorEnd) cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
			}
			if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
			if (!mode.contains) mode.contains = [];
			mode.contains = [].concat(...mode.contains.map(function(c$1) {
				return expandOrCloneMode(c$1 === "self" ? mode : c$1);
			}));
			mode.contains.forEach(function(c$1) {
				compileMode(c$1, cmode);
			});
			if (mode.starts) compileMode(mode.starts, parent);
			cmode.matcher = buildModeRegex(cmode);
			return cmode;
		}
		if (!language.compilerExtensions) language.compilerExtensions = [];
		if (language.contains && language.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
		language.classNameAliases = inherit$1(language.classNameAliases || {});
		return compileMode(language);
	}
	/**
	* Determines if a mode has a dependency on it's parent or not
	*
	* If a mode does have a parent dependency then often we need to clone it if
	* it's used in multiple places so that each copy points to the correct parent,
	* where-as modes without a parent can often safely be re-used at the bottom of
	* a mode chain.
	*
	* @param {Mode | null} mode
	* @returns {boolean} - is there a dependency on the parent?
	* */
	function dependencyOnParent(mode) {
		if (!mode) return false;
		return mode.endsWithParent || dependencyOnParent(mode.starts);
	}
	/**
	* Expands a mode or clones it if necessary
	*
	* This is necessary for modes with parental dependenceis (see notes on
	* `dependencyOnParent`) and for nodes that have `variants` - which must then be
	* exploded into their own individual modes at compile time.
	*
	* @param {Mode} mode
	* @returns {Mode | Mode[]}
	* */
	function expandOrCloneMode(mode) {
		if (mode.variants && !mode.cachedVariants) mode.cachedVariants = mode.variants.map(function(variant) {
			return inherit$1(mode, { variants: null }, variant);
		});
		if (mode.cachedVariants) return mode.cachedVariants;
		if (dependencyOnParent(mode)) return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
		if (Object.isFrozen(mode)) return inherit$1(mode);
		return mode;
	}
	var version = "11.12.0";
	var HTMLInjectionError = class extends Error {
		constructor(reason, html) {
			super(reason);
			this.name = "HTMLInjectionError";
			this.html = html;
		}
	};
	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').CompiledScope} CompiledScope
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSApi} HLJSApi
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').PluginEvent} PluginEvent
	@typedef {import('highlight.js').HLJSOptions} HLJSOptions
	@typedef {import('highlight.js').LanguageFn} LanguageFn
	@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
	@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
	@typedef {import('highlight.js/private').MatchType} MatchType
	@typedef {import('highlight.js/private').KeywordData} KeywordData
	@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
	@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
	@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
	@typedef {import('highlight.js').HighlightOptions} HighlightOptions
	@typedef {import('highlight.js').HighlightResult} HighlightResult
	*/
	const escape = escapeHTML;
	const inherit = inherit$1;
	const NO_MATCH = Symbol("nomatch");
	const MAX_KEYWORD_HITS = 7;
	/**
	* @param {any} hljs - object that is extended (legacy)
	* @returns {HLJSApi}
	*/
	const HLJS = function(hljs) {
		/** @type {Record<string, Language>} */
		const languages = Object.create(null);
		/** @type {Record<string, string>} */
		const aliases = Object.create(null);
		/** @type {HLJSPlugin[]} */
		const plugins = [];
		let SAFE_MODE = true;
		const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
		/** @type {Language} */
		const PLAINTEXT_LANGUAGE = {
			disableAutodetect: true,
			name: "Plain text",
			contains: []
		};
		/** @type HLJSOptions */
		let options = {
			ignoreUnescapedHTML: false,
			throwUnescapedHTML: false,
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: "hljs-",
			cssSelector: "pre code",
			languages: null,
			__emitter: TokenTreeEmitter
		};
		/**
		* Tests a language name to see if highlighting should be skipped
		* @param {string} languageName
		*/
		function shouldNotHighlight(languageName) {
			return options.noHighlightRe.test(languageName);
		}
		/**
		* @param {HighlightedHTMLElement} block - the HTML element to determine language for
		*/
		function blockLanguage(block) {
			let classes = block.className + " ";
			classes += block.parentNode ? block.parentNode.className : "";
			const match = options.languageDetectRe.exec(classes);
			if (match) {
				const language = getLanguage(match[1]);
				if (!language) {
					warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
					warn("Falling back to no-highlight mode for this block.", block);
				}
				return language ? match[1] : "no-highlight";
			}
			return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
		}
		/**
		* Core highlighting function.
		*
		* OLD API
		* highlight(lang, code, ignoreIllegals, continuation)
		*
		* NEW API
		* highlight(code, {lang, ignoreIllegals})
		*
		* @param {string} codeOrLanguageName - the language to use for highlighting
		* @param {string | HighlightOptions} optionsOrCode - the code to highlight
		* @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
		*
		* @returns {HighlightResult} Result - an object that represents the result
		* @property {string} language - the language name
		* @property {number} relevance - the relevance score
		* @property {string} value - the highlighted HTML code
		* @property {string} code - the original raw code
		* @property {CompiledMode} top - top of the current mode stack
		* @property {boolean} illegal - indicates whether any illegal matches were found
		*/
		function highlight$1(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
			let code = "";
			let languageName = "";
			if (typeof optionsOrCode === "object") {
				code = codeOrLanguageName;
				ignoreIllegals = optionsOrCode.ignoreIllegals;
				languageName = optionsOrCode.language;
			} else {
				deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
				deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
				languageName = codeOrLanguageName;
				code = optionsOrCode;
			}
			if (ignoreIllegals === void 0) ignoreIllegals = true;
			/** @type {BeforeHighlightContext} */
			const context = {
				code,
				language: languageName
			};
			fire("before:highlight", context);
			const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
			result.code = context.code;
			fire("after:highlight", result);
			return result;
		}
		/**
		* private highlight that's used internally and does not fire callbacks
		*
		* @param {string} languageName - the language to use for highlighting
		* @param {string} codeToHighlight - the code to highlight
		* @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
		* @param {CompiledMode?} [continuation] - current continuation mode, if any
		* @returns {HighlightResult} - result of the highlight operation
		*/
		function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
			const keywordHits = Object.create(null);
			/**
			* Return keyword data if a match is a keyword
			* @param {CompiledMode} mode - current mode
			* @param {string} matchText - the textual match
			* @returns {KeywordData | false}
			*/
			function keywordData(mode, matchText) {
				return mode.keywords[matchText];
			}
			function processKeywords() {
				if (!top.keywords) {
					emitter.addText(modeBuffer);
					return;
				}
				let lastIndex = 0;
				top.keywordPatternRe.lastIndex = 0;
				let match = top.keywordPatternRe.exec(modeBuffer);
				let buf = "";
				while (match) {
					buf += modeBuffer.substring(lastIndex, match.index);
					const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
					const data = keywordData(top, word);
					if (data) {
						const [kind, keywordRelevance] = data;
						emitter.addText(buf);
						buf = "";
						keywordHits[word] = (keywordHits[word] || 0) + 1;
						if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
						if (kind.startsWith("_")) buf += match[0];
						else {
							const cssClass = language.classNameAliases[kind] || kind;
							emitKeyword(match[0], cssClass);
						}
					} else buf += match[0];
					lastIndex = top.keywordPatternRe.lastIndex;
					match = top.keywordPatternRe.exec(modeBuffer);
				}
				buf += modeBuffer.substring(lastIndex);
				emitter.addText(buf);
			}
			function processSubLanguage() {
				if (modeBuffer === "") return;
				/** @type HighlightResult */
				let result$1 = null;
				if (typeof top.subLanguage === "string") {
					if (!languages[top.subLanguage]) {
						emitter.addText(modeBuffer);
						return;
					}
					result$1 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
					continuations[top.subLanguage] = result$1._top;
				} else result$1 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
				if (top.relevance > 0) relevance += result$1.relevance;
				emitter.__addSublanguage(result$1._emitter, result$1.language);
			}
			function processBuffer() {
				if (top.subLanguage != null) processSubLanguage();
				else processKeywords();
				modeBuffer = "";
			}
			/**
			* @param {string} text
			* @param {string} scope
			*/
			function emitKeyword(keyword, scope) {
				if (keyword === "") return;
				emitter.startScope(scope);
				emitter.addText(keyword);
				emitter.endScope();
			}
			/**
			* @param {CompiledScope} scope
			* @param {RegExpMatchArray} match
			*/
			function emitMultiClass(scope, match) {
				let i = 1;
				const max = match.length - 1;
				while (i <= max) {
					if (!scope._emit[i]) {
						i++;
						continue;
					}
					const klass = language.classNameAliases[scope[i]] || scope[i];
					const text = match[i];
					if (klass) emitKeyword(text, klass);
					else {
						modeBuffer = text;
						processKeywords();
						modeBuffer = "";
					}
					i++;
				}
			}
			/**
			* @param {CompiledMode} mode - new mode to start
			* @param {RegExpMatchArray} match
			*/
			function startNewMode(mode, match) {
				if (mode.scope && typeof mode.scope === "string") emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
				if (mode.beginScope) {
					if (mode.beginScope._wrap) {
						emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
						modeBuffer = "";
					} else if (mode.beginScope._multi) {
						emitMultiClass(mode.beginScope, match);
						modeBuffer = "";
					}
				}
				top = Object.create(mode, { parent: { value: top } });
				return top;
			}
			/**
			* @param {CompiledMode } mode - the mode to potentially end
			* @param {RegExpMatchArray} match - the latest match
			* @param {string} matchPlusRemainder - match plus remainder of content
			* @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
			*/
			function endOfMode(mode, match, matchPlusRemainder) {
				let matched = startsWith(mode.endRe, matchPlusRemainder);
				if (matched) {
					if (mode["on:end"]) {
						const resp = new Response(mode);
						mode["on:end"](match, resp);
						if (resp.isMatchIgnored) matched = false;
					}
					if (matched) {
						while (mode.endsParent && mode.parent) mode = mode.parent;
						return mode;
					}
				}
				if (mode.endsWithParent) return endOfMode(mode.parent, match, matchPlusRemainder);
			}
			/**
			* Handle matching but then ignoring a sequence of text
			*
			* @param {string} lexeme - string containing full match text
			*/
			function doIgnore(lexeme) {
				if (top.matcher.regexIndex === 0) {
					modeBuffer += lexeme[0];
					return 1;
				} else {
					resumeScanAtSamePosition = true;
					return 0;
				}
			}
			/**
			* Handle the start of a new potential mode match
			*
			* @param {EnhancedMatch} match - the current match
			* @returns {number} how far to advance the parse cursor
			*/
			function doBeginMatch(match) {
				const lexeme = match[0];
				const newMode = match.rule;
				const resp = new Response(newMode);
				const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
				for (const cb of beforeCallbacks) {
					if (!cb) continue;
					cb(match, resp);
					if (resp.isMatchIgnored) return doIgnore(lexeme);
				}
				if (newMode.skip) modeBuffer += lexeme;
				else {
					if (newMode.excludeBegin) modeBuffer += lexeme;
					processBuffer();
					if (!newMode.returnBegin && !newMode.excludeBegin) modeBuffer = lexeme;
				}
				startNewMode(newMode, match);
				return newMode.returnBegin ? 0 : lexeme.length;
			}
			/**
			* Handle the potential end of mode
			*
			* @param {RegExpMatchArray} match - the current match
			*/
			function doEndMatch(match) {
				const lexeme = match[0];
				const matchPlusRemainder = codeToHighlight.substring(match.index);
				const endMode = endOfMode(top, match, matchPlusRemainder);
				if (!endMode) return NO_MATCH;
				const origin = top;
				if (top.endScope && top.endScope._wrap) {
					processBuffer();
					emitKeyword(lexeme, top.endScope._wrap);
				} else if (top.endScope && top.endScope._multi) {
					processBuffer();
					emitMultiClass(top.endScope, match);
				} else if (origin.skip) modeBuffer += lexeme;
				else {
					if (!(origin.returnEnd || origin.excludeEnd)) modeBuffer += lexeme;
					processBuffer();
					if (origin.excludeEnd) modeBuffer = lexeme;
				}
				do {
					if (top.scope) emitter.closeNode();
					if (!top.skip && !top.subLanguage) relevance += top.relevance;
					top = top.parent;
				} while (top !== endMode.parent);
				if (endMode.starts) startNewMode(endMode.starts, match);
				return origin.returnEnd ? 0 : lexeme.length;
			}
			function processContinuations() {
				const list = [];
				for (let current = top; current !== language; current = current.parent) if (current.scope) list.unshift(current.scope);
				list.forEach((item) => emitter.openNode(item));
			}
			/** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
			let lastMatch = {};
			/**
			*  Process an individual match
			*
			* @param {string} textBeforeMatch - text preceding the match (since the last match)
			* @param {EnhancedMatch} [match] - the match itself
			*/
			function processLexeme(textBeforeMatch, match) {
				const lexeme = match && match[0];
				modeBuffer += textBeforeMatch;
				if (lexeme == null) {
					processBuffer();
					return 0;
				}
				if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
					modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
					if (!SAFE_MODE) {
						/** @type {AnnotatedError} */
						const err = /* @__PURE__ */ new Error(`0 width match regex (${languageName})`);
						err.languageName = languageName;
						err.badRule = lastMatch.rule;
						throw err;
					}
					return 1;
				}
				lastMatch = match;
				if (match.type === "begin") return doBeginMatch(match);
				else if (match.type === "illegal" && !ignoreIllegals) {
					/** @type {AnnotatedError} */
					const err = /* @__PURE__ */ new Error("Illegal lexeme \"" + lexeme + "\" for mode \"" + (top.scope || "<unnamed>") + "\"");
					err.mode = top;
					throw err;
				} else if (match.type === "end") {
					const processed = doEndMatch(match);
					if (processed !== NO_MATCH) return processed;
				}
				if (match.type === "illegal" && lexeme === "") {
					if (match.index === codeToHighlight.length);
					else modeBuffer += "\n";
					return 1;
				}
				if (iterations > 1e5 && iterations > match.index * 3) throw /* @__PURE__ */ new Error("potential infinite loop, way more iterations than matches");
				modeBuffer += lexeme;
				return lexeme.length;
			}
			const language = getLanguage(languageName);
			if (!language) {
				error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
				throw new Error("Unknown language: \"" + languageName + "\"");
			}
			const md = compileLanguage(language);
			let result = "";
			/** @type {CompiledMode} */
			let top = continuation || md;
			/** @type Record<string,CompiledMode> */
			const continuations = {};
			const emitter = new options.__emitter(options);
			processContinuations();
			let modeBuffer = "";
			let relevance = 0;
			let index = 0;
			let iterations = 0;
			let resumeScanAtSamePosition = false;
			try {
				if (!language.__emitTokens) {
					top.matcher.considerAll();
					for (;;) {
						iterations++;
						if (resumeScanAtSamePosition) resumeScanAtSamePosition = false;
						else top.matcher.considerAll();
						top.matcher.lastIndex = index;
						const match = top.matcher.exec(codeToHighlight);
						if (!match) break;
						const processedCount = processLexeme(codeToHighlight.substring(index, match.index), match);
						index = match.index + processedCount;
					}
					processLexeme(codeToHighlight.substring(index));
				} else language.__emitTokens(codeToHighlight, emitter);
				emitter.finalize();
				result = emitter.toHTML();
				return {
					language: languageName,
					value: result,
					relevance,
					illegal: false,
					_emitter: emitter,
					_top: top
				};
			} catch (err) {
				if (err.message && err.message.includes("Illegal")) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: true,
					relevance: 0,
					_illegalBy: {
						message: err.message,
						index,
						context: codeToHighlight.slice(index - 100, index + 100),
						mode: err.mode,
						resultSoFar: result
					},
					_emitter: emitter
				};
				else if (SAFE_MODE) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: false,
					relevance: 0,
					errorRaised: err,
					_emitter: emitter,
					_top: top
				};
				else throw err;
			}
		}
		/**
		* returns a valid highlight result, without actually doing any actual work,
		* auto highlight starts with this and it's possible for small snippets that
		* auto-detection may not find a better match
		* @param {string} code
		* @returns {HighlightResult}
		*/
		function justTextHighlightResult(code) {
			const result = {
				value: escape(code),
				illegal: false,
				relevance: 0,
				_top: PLAINTEXT_LANGUAGE,
				_emitter: new options.__emitter(options)
			};
			result._emitter.addText(code);
			return result;
		}
		/**
		Highlighting with language detection. Accepts a string with the code to
		highlight. Returns an object with the following properties:
		
		- language (detected language)
		- relevance (int)
		- value (an HTML string with highlighting markup)
		- secondBest (object with the same structure for second-best heuristically
		detected language, may be absent)
		
		@param {string} code
		@param {Array<string>} [languageSubset]
		@returns {AutoHighlightResult}
		*/
		function highlightAuto(code, languageSubset) {
			languageSubset = languageSubset || options.languages || Object.keys(languages);
			const plaintext = justTextHighlightResult(code);
			const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name) => _highlight(name, code, false));
			results.unshift(plaintext);
			const [best, secondBest] = results.sort((a, b) => {
				if (a.relevance !== b.relevance) return b.relevance - a.relevance;
				if (a.language && b.language) {
					if (getLanguage(a.language).supersetOf === b.language) return 1;
					else if (getLanguage(b.language).supersetOf === a.language) return -1;
				}
				return 0;
			});
			/** @type {AutoHighlightResult} */
			const result = best;
			result.secondBest = secondBest;
			return result;
		}
		/**
		* Builds new class name for block given the language name
		*
		* @param {HTMLElement} element
		* @param {string} [currentLang]
		* @param {string} [resultLang]
		*/
		function updateClassName(element, currentLang, resultLang) {
			const language = currentLang && aliases[currentLang] || resultLang;
			element.classList.add("hljs");
			element.classList.add(`language-${language}`);
		}
		/**
		* Applies highlighting to a DOM node containing code.
		*
		* @param {HighlightedHTMLElement} element - the HTML element to highlight
		*/
		function highlightElement(element) {
			/** @type HTMLElement */
			let node = null;
			const language = blockLanguage(element);
			if (shouldNotHighlight(language)) return;
			fire("before:highlightElement", {
				el: element,
				language
			});
			if (element.dataset.highlighted) {
				console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
				return;
			}
			if (element.children.length > 0) {
				if (!options.ignoreUnescapedHTML) {
					console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
					console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
					console.warn("The element with unescaped HTML:");
					console.warn(element);
				}
				if (options.throwUnescapedHTML) throw new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML);
			}
			node = element;
			const text = node.textContent;
			const result = language ? highlight$1(text, {
				language,
				ignoreIllegals: true
			}) : highlightAuto(text);
			element.innerHTML = result.value;
			element.dataset.highlighted = "yes";
			updateClassName(element, language, result.language);
			element.result = {
				language: result.language,
				re: result.relevance,
				relevance: result.relevance
			};
			if (result.secondBest) element.secondBest = {
				language: result.secondBest.language,
				relevance: result.secondBest.relevance
			};
			fire("after:highlightElement", {
				el: element,
				result,
				text
			});
		}
		/**
		* Updates highlight.js global options with the passed options
		*
		* @param {Partial<HLJSOptions>} userOptions
		*/
		function configure(userOptions) {
			options = inherit(options, userOptions);
		}
		const initHighlighting = () => {
			highlightAll();
			deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
		};
		function initHighlightingOnLoad() {
			highlightAll();
			deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
		}
		let wantsHighlight = false;
		/**
		* auto-highlights all pre>code elements on the page
		*/
		function highlightAll() {
			function boot() {
				highlightAll();
			}
			if (document.readyState === "loading") {
				if (!wantsHighlight) window.addEventListener("DOMContentLoaded", boot, false);
				wantsHighlight = true;
				return;
			}
			document.querySelectorAll(options.cssSelector).forEach(highlightElement);
		}
		/**
		* Register a language grammar module
		*
		* @param {string} languageName
		* @param {LanguageFn} languageDefinition
		*/
		function registerLanguage(languageName, languageDefinition) {
			let lang = null;
			try {
				lang = languageDefinition(hljs);
			} catch (error$1) {
				error("Language definition for '{}' could not be registered.".replace("{}", languageName));
				if (!SAFE_MODE) throw error$1;
				else error(error$1);
				lang = PLAINTEXT_LANGUAGE;
			}
			if (!lang.name) lang.name = languageName;
			languages[languageName] = lang;
			lang.rawDefinition = languageDefinition.bind(null, hljs);
			if (lang.aliases) registerAliases(lang.aliases, { languageName });
		}
		/**
		* Remove a language grammar module
		*
		* @param {string} languageName
		*/
		function unregisterLanguage(languageName) {
			delete languages[languageName];
			for (const alias of Object.keys(aliases)) if (aliases[alias] === languageName) delete aliases[alias];
		}
		/**
		* @returns {string[]} List of language internal names
		*/
		function listLanguages() {
			return Object.keys(languages);
		}
		/**
		* @param {string} name - name of the language to retrieve
		* @returns {Language | undefined}
		*/
		function getLanguage(name) {
			name = (name || "").toLowerCase();
			return languages[name] || languages[aliases[name]];
		}
		/**
		*
		* @param {string|string[]} aliasList - single alias or list of aliases
		* @param {{languageName: string}} opts
		*/
		function registerAliases(aliasList, { languageName }) {
			if (typeof aliasList === "string") aliasList = [aliasList];
			aliasList.forEach((alias) => {
				aliases[alias.toLowerCase()] = languageName;
			});
		}
		/**
		* Determines if a given language has auto-detection enabled
		* @param {string} name - name of the language
		*/
		function autoDetection(name) {
			const lang = getLanguage(name);
			return lang && !lang.disableAutodetect;
		}
		/**
		* Upgrades the old highlightBlock plugins to the new
		* highlightElement API
		* @param {HLJSPlugin} plugin
		*/
		function upgradePluginAPI(plugin) {
			if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) plugin["before:highlightElement"] = (data) => {
				plugin["before:highlightBlock"](Object.assign({ block: data.el }, data));
			};
			if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) plugin["after:highlightElement"] = (data) => {
				plugin["after:highlightBlock"](Object.assign({ block: data.el }, data));
			};
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function addPlugin(plugin) {
			upgradePluginAPI(plugin);
			plugins.push(plugin);
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function removePlugin(plugin) {
			const index = plugins.indexOf(plugin);
			if (index !== -1) plugins.splice(index, 1);
		}
		/**
		*
		* @param {PluginEvent} event
		* @param {any} args
		*/
		function fire(event, args) {
			const cb = event;
			plugins.forEach(function(plugin) {
				if (plugin[cb]) plugin[cb](args);
			});
		}
		/**
		* DEPRECATED
		* @param {HighlightedHTMLElement} el
		*/
		function deprecateHighlightBlock(el) {
			deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
			deprecated("10.7.0", "Please use highlightElement now.");
			return highlightElement(el);
		}
		Object.assign(hljs, {
			highlight: highlight$1,
			highlightAuto,
			highlightAll,
			highlightElement,
			highlightBlock: deprecateHighlightBlock,
			configure,
			initHighlighting,
			initHighlightingOnLoad,
			registerLanguage,
			unregisterLanguage,
			listLanguages,
			getLanguage,
			registerAliases,
			autoDetection,
			inherit,
			addPlugin,
			removePlugin
		});
		hljs.debugMode = function() {
			SAFE_MODE = false;
		};
		hljs.safeMode = function() {
			SAFE_MODE = true;
		};
		hljs.versionString = version;
		hljs.regex = {
			concat,
			lookahead,
			either,
			optional,
			anyNumberOfTimes
		};
		for (const key in MODES$1) if (typeof MODES$1[key] === "object") deepFreeze(MODES$1[key]);
		Object.assign(hljs, MODES$1);
		return hljs;
	};
	const highlight = HLJS({});
	highlight.newInstance = () => HLJS({});
	module.exports = highlight;
	highlight.HighlightJS = highlight;
	highlight.default = highlight;
}) });

//#endregion
//#region node_modules/highlight.js/es/core.js
var import_xterm = /* @__PURE__ */ __toESM(require_xterm());
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
var core_default = import_core.default;

//#endregion
//#region node_modules/highlight.js/es/languages/bash.js
/** @type LanguageFn */
function bash(hljs) {
	const regex = hljs.regex;
	const VAR = {};
	const BRACED_VAR = {
		begin: /\$\{/,
		end: /\}/,
		contains: ["self", {
			begin: /:-/,
			contains: [VAR]
		}]
	};
	Object.assign(VAR, {
		className: "variable",
		variants: [{ begin: regex.concat(/\$[\w\d#@][\w\d_]*/, `(?![\\w\\d])(?![$])`) }, BRACED_VAR]
	});
	const SUBST = {
		className: "subst",
		begin: /\$\(/,
		end: /\)/,
		contains: [hljs.BACKSLASH_ESCAPE]
	};
	const COMMENT$1 = hljs.inherit(hljs.COMMENT(), {
		match: [/(^|\s)/, /#.*$/],
		scope: { 2: "comment" }
	});
	const HERE_DOC = {
		begin: /<<-?\s*(?=\w+)/,
		starts: { contains: [hljs.END_SAME_AS_BEGIN({
			begin: /(\w+)/,
			end: /(\w+)/,
			className: "string"
		})] }
	};
	const QUOTE_STRING = {
		className: "string",
		begin: /"/,
		end: /"/,
		contains: [
			hljs.BACKSLASH_ESCAPE,
			VAR,
			SUBST
		]
	};
	SUBST.contains.push(QUOTE_STRING);
	const ESCAPED_QUOTE = { match: /\\"/ };
	const APOS_STRING = {
		className: "string",
		begin: /'/,
		end: /'/
	};
	const ESCAPED_APOS = { match: /\\'/ };
	const ARITHMETIC = {
		begin: /\$?\(\(/,
		end: /\)\)/,
		contains: [
			{
				begin: /\d+#[0-9a-f]+/,
				className: "number"
			},
			hljs.NUMBER_MODE,
			VAR
		]
	};
	const KNOWN_SHEBANG = hljs.SHEBANG({
		binary: `(${[
			"fish",
			"bash",
			"zsh",
			"sh",
			"csh",
			"ksh",
			"tcsh",
			"dash",
			"scsh"
		].join("|")})`,
		relevance: 10
	});
	const FUNCTION = {
		className: "function",
		begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
		returnBegin: true,
		contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
		relevance: 0
	};
	const KEYWORDS$2 = [
		"if",
		"then",
		"else",
		"elif",
		"fi",
		"time",
		"for",
		"while",
		"until",
		"in",
		"do",
		"done",
		"case",
		"esac",
		"coproc",
		"function",
		"select"
	];
	const LITERALS$2 = ["true", "false"];
	const PATH_MODE = { match: /(\/[a-z._-]+)+/ };
	const SHELL_BUILT_INS = [
		"break",
		"cd",
		"continue",
		"eval",
		"exec",
		"exit",
		"export",
		"getopts",
		"hash",
		"pwd",
		"readonly",
		"return",
		"shift",
		"test",
		"times",
		"trap",
		"umask",
		"unset"
	];
	const BASH_BUILT_INS = [
		"alias",
		"bind",
		"builtin",
		"caller",
		"command",
		"declare",
		"echo",
		"enable",
		"help",
		"let",
		"local",
		"logout",
		"mapfile",
		"printf",
		"read",
		"readarray",
		"source",
		"sudo",
		"type",
		"typeset",
		"ulimit",
		"unalias"
	];
	const ZSH_BUILT_INS = [
		"autoload",
		"bg",
		"bindkey",
		"bye",
		"cap",
		"chdir",
		"clone",
		"comparguments",
		"compcall",
		"compctl",
		"compdescribe",
		"compfiles",
		"compgroups",
		"compquote",
		"comptags",
		"comptry",
		"compvalues",
		"dirs",
		"disable",
		"disown",
		"echotc",
		"echoti",
		"emulate",
		"fc",
		"fg",
		"float",
		"functions",
		"getcap",
		"getln",
		"history",
		"integer",
		"jobs",
		"kill",
		"limit",
		"log",
		"noglob",
		"popd",
		"print",
		"pushd",
		"pushln",
		"rehash",
		"sched",
		"setcap",
		"setopt",
		"stat",
		"suspend",
		"ttyctl",
		"unfunction",
		"unhash",
		"unlimit",
		"unsetopt",
		"vared",
		"wait",
		"whence",
		"where",
		"which",
		"zcompile",
		"zformat",
		"zftp",
		"zle",
		"zmodload",
		"zparseopts",
		"zprof",
		"zpty",
		"zregexparse",
		"zsocket",
		"zstyle",
		"ztcp"
	];
	const GNU_CORE_UTILS = [
		"chcon",
		"chgrp",
		"chown",
		"chmod",
		"cp",
		"dd",
		"df",
		"dir",
		"dircolors",
		"ln",
		"ls",
		"mkdir",
		"mkfifo",
		"mknod",
		"mktemp",
		"mv",
		"realpath",
		"rm",
		"rmdir",
		"shred",
		"sync",
		"touch",
		"truncate",
		"vdir",
		"b2sum",
		"base32",
		"base64",
		"cat",
		"cksum",
		"comm",
		"csplit",
		"cut",
		"expand",
		"fmt",
		"fold",
		"head",
		"join",
		"md5sum",
		"nl",
		"numfmt",
		"od",
		"paste",
		"ptx",
		"pr",
		"sha1sum",
		"sha224sum",
		"sha256sum",
		"sha384sum",
		"sha512sum",
		"shuf",
		"sort",
		"split",
		"sum",
		"tac",
		"tail",
		"tr",
		"tsort",
		"unexpand",
		"uniq",
		"wc",
		"arch",
		"basename",
		"chroot",
		"date",
		"dirname",
		"du",
		"echo",
		"env",
		"expr",
		"factor",
		"groups",
		"hostid",
		"id",
		"link",
		"logname",
		"nice",
		"nohup",
		"nproc",
		"pathchk",
		"pinky",
		"printenv",
		"printf",
		"pwd",
		"readlink",
		"runcon",
		"seq",
		"sleep",
		"stat",
		"stdbuf",
		"stty",
		"tee",
		"test",
		"timeout",
		"tty",
		"uname",
		"unlink",
		"uptime",
		"users",
		"who",
		"whoami",
		"yes"
	];
	return {
		name: "Bash",
		aliases: ["sh", "zsh"],
		keywords: {
			$pattern: /\b[a-z][a-z0-9._-]+\b/,
			keyword: KEYWORDS$2,
			literal: LITERALS$2,
			built_in: [
				...SHELL_BUILT_INS,
				...BASH_BUILT_INS,
				"set",
				"shopt",
				...ZSH_BUILT_INS,
				...GNU_CORE_UTILS
			]
		},
		contains: [
			KNOWN_SHEBANG,
			hljs.SHEBANG(),
			FUNCTION,
			ARITHMETIC,
			COMMENT$1,
			HERE_DOC,
			PATH_MODE,
			QUOTE_STRING,
			ESCAPED_QUOTE,
			APOS_STRING,
			ESCAPED_APOS,
			VAR
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/c.js
/** @type LanguageFn */
function c(hljs) {
	const regex = hljs.regex;
	const C_LINE_COMMENT_MODE$1 = hljs.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] });
	const DECLTYPE_AUTO_RE = "decltype\\(auto\\)";
	const NAMESPACE_RE = "[a-zA-Z_]\\w*::";
	const FUNCTION_TYPE_RE = "(" + DECLTYPE_AUTO_RE + "|" + regex.optional(NAMESPACE_RE) + "[a-zA-Z_]\\w*" + regex.optional("<[^<>]+>") + ")";
	const TYPES$2 = {
		className: "type",
		variants: [{ begin: "\\b[a-z\\d_]*_t\\b" }, { match: regex.concat(/\batomic_/, regex.either("bool", "char", "schar", "uchar", "short", "ushort", "int", "uint", "long", "ulong", "llong", "ullong", "char16_t", "char32_t", "wchar_t", "int_least8_t", "uint_least8_t", "int_least16_t", "uint_least16_t", "int_least32_t", "uint_least32_t", "int_least64_t", "uint_least64_t", "int_fast8_t", "uint_fast8_t", "int_fast16_t", "uint_fast16_t", "int_fast32_t", "uint_fast32_t", "int_fast64_t", "uint_fast64_t", "intptr_t", "uintptr_t", "size_t", "ptrdiff_t", "intmax_t", "uintmax_t"), /\b/) }]
	};
	const STRINGS = {
		className: "string",
		variants: [
			{
				begin: "(u8?|U|L)?\"",
				end: "\"",
				illegal: "\\n",
				contains: [hljs.BACKSLASH_ESCAPE]
			},
			{
				begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
				end: "'",
				illegal: "."
			},
			hljs.END_SAME_AS_BEGIN({
				begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
				end: /\)([^()\\\s"]{0,16})"/
			})
		]
	};
	const NUMBERS = {
		className: "number",
		variants: [
			{ match: /\b(0b[01']+)/ },
			{ match: /(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/ },
			{ match: /(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/ },
			{ match: /(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/ }
		],
		relevance: 0
	};
	const PREPROCESSOR_INCLUDE = {
		scope: "meta",
		begin: /#\s*include\b/,
		end: /$/,
		keywords: { keyword: "include" },
		contains: [
			{ begin: /\\\n/ },
			STRINGS,
			{
				scope: "string",
				begin: /<.*?>/
			},
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE
		]
	};
	const PREPROCESSOR = {
		className: "meta",
		begin: /#\s*[a-z]+\b/,
		end: /$/,
		keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include" },
		contains: [
			{
				begin: /\\\n/,
				relevance: 0
			},
			hljs.inherit(STRINGS, { className: "string" }),
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE
		]
	};
	const PREPROCESSORS = [PREPROCESSOR_INCLUDE, PREPROCESSOR];
	const TITLE_MODE$1 = {
		className: "title",
		begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
		relevance: 0
	};
	const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + "\\s*\\(";
	const KEYWORDS$2 = {
		keyword: [
			"asm",
			"auto",
			"break",
			"case",
			"continue",
			"default",
			"do",
			"else",
			"enum",
			"extern",
			"for",
			"fortran",
			"goto",
			"if",
			"inline",
			"register",
			"restrict",
			"return",
			"sizeof",
			"typeof",
			"typeof_unqual",
			"struct",
			"switch",
			"typedef",
			"union",
			"volatile",
			"while",
			"_Alignas",
			"_Alignof",
			"_Atomic",
			"_Generic",
			"_Noreturn",
			"_Static_assert",
			"_Thread_local",
			"alignas",
			"alignof",
			"noreturn",
			"static_assert",
			"thread_local",
			"_Pragma"
		],
		type: [
			"float",
			"double",
			"signed",
			"unsigned",
			"int",
			"short",
			"long",
			"char",
			"void",
			"_Bool",
			"_BitInt",
			"_Complex",
			"_Imaginary",
			"_Decimal32",
			"_Decimal64",
			"_Decimal96",
			"_Decimal128",
			"_Decimal64x",
			"_Decimal128x",
			"_Float16",
			"_Float32",
			"_Float64",
			"_Float128",
			"_Float32x",
			"_Float64x",
			"_Float128x",
			"const",
			"static",
			"constexpr",
			"complex",
			"bool",
			"imaginary"
		],
		literal: "true false NULL",
		built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
	};
	const EXPRESSION_CONTAINS = [
		...PREPROCESSORS,
		TYPES$2,
		C_LINE_COMMENT_MODE$1,
		hljs.C_BLOCK_COMMENT_MODE,
		NUMBERS,
		STRINGS
	];
	const EXPRESSION_CONTEXT = {
		variants: [
			{
				begin: /=/,
				end: /;/
			},
			{
				begin: /\(/,
				end: /\)/
			},
			{
				beginKeywords: "new throw return else",
				end: /;/
			}
		],
		keywords: KEYWORDS$2,
		contains: EXPRESSION_CONTAINS.concat([{
			begin: /\(/,
			end: /\)/,
			keywords: KEYWORDS$2,
			contains: EXPRESSION_CONTAINS.concat(["self"]),
			relevance: 0
		}]),
		relevance: 0
	};
	const FUNCTION_DECLARATION = {
		begin: "(" + FUNCTION_TYPE_RE + "[\\*&\\s]+){1,12}" + FUNCTION_TITLE,
		returnBegin: true,
		end: /[{;=]/,
		excludeEnd: true,
		keywords: KEYWORDS$2,
		illegal: /[^\w\s\*&:<>.]/,
		contains: [
			{
				begin: DECLTYPE_AUTO_RE,
				keywords: KEYWORDS$2,
				relevance: 0
			},
			{
				begin: FUNCTION_TITLE,
				returnBegin: true,
				contains: [hljs.inherit(TITLE_MODE$1, { className: "title.function" })],
				relevance: 0
			},
			{
				relevance: 0,
				match: /,/
			},
			{
				className: "params",
				begin: /\(/,
				end: /\)/,
				keywords: KEYWORDS$2,
				relevance: 0,
				contains: [
					C_LINE_COMMENT_MODE$1,
					hljs.C_BLOCK_COMMENT_MODE,
					STRINGS,
					NUMBERS,
					TYPES$2,
					{
						begin: /\(/,
						end: /\)/,
						keywords: KEYWORDS$2,
						relevance: 0,
						contains: [
							"self",
							C_LINE_COMMENT_MODE$1,
							hljs.C_BLOCK_COMMENT_MODE,
							STRINGS,
							NUMBERS,
							TYPES$2
						]
					}
				]
			},
			TYPES$2,
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE,
			...PREPROCESSORS
		]
	};
	return {
		name: "C",
		aliases: ["h"],
		keywords: KEYWORDS$2,
		disableAutodetect: true,
		illegal: "</",
		contains: [].concat(EXPRESSION_CONTEXT, FUNCTION_DECLARATION, EXPRESSION_CONTAINS, [
			...PREPROCESSORS,
			{
				begin: hljs.IDENT_RE + "::",
				keywords: KEYWORDS$2
			},
			{
				className: "class",
				beginKeywords: "enum class struct union",
				end: /[{;:<>=]/,
				contains: [{ beginKeywords: "final class struct" }, hljs.TITLE_MODE]
			}
		]),
		exports: {
			preprocessor: PREPROCESSOR,
			strings: STRINGS,
			keywords: KEYWORDS$2
		}
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/cpp.js
/** @type LanguageFn */
function cpp(hljs) {
	const regex = hljs.regex;
	const C_LINE_COMMENT_MODE$1 = hljs.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] });
	const DECLTYPE_AUTO_RE = "decltype\\(auto\\)";
	const NAMESPACE_RE = "[a-zA-Z_]\\w*::";
	const FUNCTION_TYPE_RE = "(?!struct)(" + DECLTYPE_AUTO_RE + "|" + regex.optional(NAMESPACE_RE) + "[a-zA-Z_]\\w*" + regex.optional("<[^<>]+>") + ")";
	const CPP_PRIMITIVE_TYPES = {
		className: "type",
		begin: "\\b[a-z\\d_]*_t\\b"
	};
	const STRINGS = {
		className: "string",
		variants: [
			{
				begin: "(u8?|U|L)?\"",
				end: "\"",
				illegal: "\\n",
				contains: [hljs.BACKSLASH_ESCAPE]
			},
			{
				begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
				end: "'",
				illegal: "."
			},
			hljs.END_SAME_AS_BEGIN({
				begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
				end: /\)([^()\\\s"]{0,16})"/
			})
		]
	};
	const NUMBERS = {
		className: "number",
		variants: [{ begin: "[+-]?(?:(?:\\b[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|\\b[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|\\b0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)" }, { begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)" }],
		relevance: 0
	};
	const PREPROCESSORS = [{
		scope: "meta",
		begin: /#\s*include\b/,
		end: /$/,
		keywords: { keyword: "include" },
		contains: [
			{ begin: /\\\n/ },
			STRINGS,
			{
				scope: "string",
				begin: /<.*?>/
			},
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE
		]
	}, {
		className: "meta",
		begin: /#\s*[a-z]+\b/,
		end: /$/,
		keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
		contains: [
			{
				begin: /\\\n/,
				relevance: 0
			},
			hljs.inherit(STRINGS, { className: "string" }),
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE
		]
	}];
	const TITLE_MODE$1 = {
		className: "title",
		begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
		relevance: 0
	};
	const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + "\\s*\\(";
	const RESERVED_KEYWORDS = [
		"alignas",
		"alignof",
		"and",
		"and_eq",
		"asm",
		"atomic_cancel",
		"atomic_commit",
		"atomic_noexcept",
		"auto",
		"bitand",
		"bitor",
		"break",
		"case",
		"catch",
		"class",
		"co_await",
		"co_return",
		"co_yield",
		"compl",
		"concept",
		"const_cast|10",
		"consteval",
		"constexpr",
		"constinit",
		"continue",
		"decltype",
		"default",
		"delete",
		"do",
		"dynamic_cast|10",
		"else",
		"enum",
		"explicit",
		"export",
		"extern",
		"false",
		"final",
		"for",
		"friend",
		"goto",
		"if",
		"import",
		"inline",
		"module",
		"mutable",
		"namespace",
		"new",
		"noexcept",
		"not",
		"not_eq",
		"nullptr",
		"operator",
		"or",
		"or_eq",
		"override",
		"private",
		"protected",
		"public",
		"reflexpr",
		"register",
		"reinterpret_cast|10",
		"requires",
		"return",
		"sizeof",
		"static_assert",
		"static_cast|10",
		"struct",
		"switch",
		"synchronized",
		"template",
		"this",
		"thread_local",
		"throw",
		"transaction_safe",
		"transaction_safe_dynamic",
		"true",
		"try",
		"typedef",
		"typeid",
		"typename",
		"union",
		"using",
		"virtual",
		"volatile",
		"while",
		"xor",
		"xor_eq"
	];
	const RESERVED_TYPES = [
		"bool",
		"char",
		"char16_t",
		"char32_t",
		"char8_t",
		"double",
		"float",
		"int",
		"long",
		"short",
		"void",
		"wchar_t",
		"unsigned",
		"signed",
		"const",
		"static"
	];
	const TYPE_HINTS = [
		"any",
		"auto_ptr",
		"barrier",
		"binary_semaphore",
		"bitset",
		"complex",
		"condition_variable",
		"condition_variable_any",
		"counting_semaphore",
		"deque",
		"false_type",
		"flat_map",
		"flat_set",
		"future",
		"imaginary",
		"initializer_list",
		"istringstream",
		"jthread",
		"latch",
		"lock_guard",
		"multimap",
		"multiset",
		"mutex",
		"optional",
		"ostringstream",
		"packaged_task",
		"pair",
		"promise",
		"priority_queue",
		"queue",
		"recursive_mutex",
		"recursive_timed_mutex",
		"scoped_lock",
		"set",
		"shared_future",
		"shared_lock",
		"shared_mutex",
		"shared_timed_mutex",
		"shared_ptr",
		"stack",
		"string_view",
		"stringstream",
		"timed_mutex",
		"thread",
		"true_type",
		"tuple",
		"unique_lock",
		"unique_ptr",
		"unordered_map",
		"unordered_multimap",
		"unordered_multiset",
		"unordered_set",
		"variant",
		"vector",
		"weak_ptr",
		"wstring",
		"wstring_view"
	];
	const FUNCTION_HINTS = [
		"abort",
		"abs",
		"acos",
		"apply",
		"as_const",
		"asin",
		"atan",
		"atan2",
		"calloc",
		"ceil",
		"cerr",
		"cin",
		"clog",
		"cos",
		"cosh",
		"cout",
		"declval",
		"endl",
		"exchange",
		"exit",
		"exp",
		"fabs",
		"floor",
		"fmod",
		"forward",
		"fprintf",
		"fputs",
		"free",
		"frexp",
		"fscanf",
		"future",
		"invoke",
		"isalnum",
		"isalpha",
		"iscntrl",
		"isdigit",
		"isgraph",
		"islower",
		"isprint",
		"ispunct",
		"isspace",
		"isupper",
		"isxdigit",
		"labs",
		"launder",
		"ldexp",
		"log",
		"log10",
		"make_pair",
		"make_shared",
		"make_shared_for_overwrite",
		"make_tuple",
		"make_unique",
		"malloc",
		"memchr",
		"memcmp",
		"memcpy",
		"memset",
		"modf",
		"move",
		"pow",
		"printf",
		"putchar",
		"puts",
		"realloc",
		"scanf",
		"sin",
		"sinh",
		"snprintf",
		"sprintf",
		"sqrt",
		"sscanf",
		"std",
		"stderr",
		"stdin",
		"stdout",
		"strcat",
		"strchr",
		"strcmp",
		"strcpy",
		"strcspn",
		"strlen",
		"strncat",
		"strncmp",
		"strncpy",
		"strpbrk",
		"strrchr",
		"strspn",
		"strstr",
		"swap",
		"tan",
		"tanh",
		"terminate",
		"to_underlying",
		"tolower",
		"toupper",
		"vfprintf",
		"visit",
		"vprintf",
		"vsprintf"
	];
	const CPP_KEYWORDS = {
		type: RESERVED_TYPES,
		keyword: RESERVED_KEYWORDS,
		literal: [
			"NULL",
			"false",
			"nullopt",
			"nullptr",
			"true"
		],
		built_in: ["_Pragma"],
		_type_hints: TYPE_HINTS
	};
	const FUNCTION_DISPATCH = {
		className: "function.dispatch",
		relevance: 0,
		keywords: { _hint: FUNCTION_HINTS },
		begin: regex.concat(/\b/, `(?!${RESERVED_KEYWORDS.join("|")})`, hljs.IDENT_RE, regex.lookahead(/(<[^<>]+>|)\s*\(/))
	};
	const EXPRESSION_CONTAINS = [
		FUNCTION_DISPATCH,
		...PREPROCESSORS,
		CPP_PRIMITIVE_TYPES,
		C_LINE_COMMENT_MODE$1,
		hljs.C_BLOCK_COMMENT_MODE,
		NUMBERS,
		STRINGS
	];
	const EXPRESSION_CONTEXT = {
		variants: [
			{
				begin: /=/,
				end: /;/
			},
			{
				begin: /\(/,
				end: /\)/
			},
			{
				beginKeywords: "new throw return else",
				end: /;/
			}
		],
		keywords: CPP_KEYWORDS,
		contains: EXPRESSION_CONTAINS.concat([{
			begin: /\(/,
			end: /\)/,
			keywords: CPP_KEYWORDS,
			contains: EXPRESSION_CONTAINS.concat(["self"]),
			relevance: 0
		}]),
		relevance: 0
	};
	const FUNCTION_DECLARATION = {
		className: "function",
		begin: "(" + FUNCTION_TYPE_RE + "[\\*&\\s]+){1,12}" + FUNCTION_TITLE,
		returnBegin: true,
		end: /[{;=]/,
		excludeEnd: true,
		keywords: CPP_KEYWORDS,
		illegal: /[^\w\s\*&:<>.]/,
		contains: [
			{
				begin: DECLTYPE_AUTO_RE,
				keywords: CPP_KEYWORDS,
				relevance: 0
			},
			{
				begin: FUNCTION_TITLE,
				returnBegin: true,
				contains: [TITLE_MODE$1],
				relevance: 0
			},
			{
				begin: /::/,
				relevance: 0
			},
			{
				begin: /:/,
				endsWithParent: true,
				contains: [STRINGS, NUMBERS]
			},
			{
				relevance: 0,
				match: /,/
			},
			{
				className: "params",
				begin: /\(/,
				end: /\)/,
				keywords: CPP_KEYWORDS,
				relevance: 0,
				contains: [
					C_LINE_COMMENT_MODE$1,
					hljs.C_BLOCK_COMMENT_MODE,
					STRINGS,
					NUMBERS,
					CPP_PRIMITIVE_TYPES,
					{
						begin: /\(/,
						end: /\)/,
						keywords: CPP_KEYWORDS,
						relevance: 0,
						contains: [
							"self",
							C_LINE_COMMENT_MODE$1,
							hljs.C_BLOCK_COMMENT_MODE,
							STRINGS,
							NUMBERS,
							CPP_PRIMITIVE_TYPES
						]
					}
				]
			},
			CPP_PRIMITIVE_TYPES,
			C_LINE_COMMENT_MODE$1,
			hljs.C_BLOCK_COMMENT_MODE,
			...PREPROCESSORS
		]
	};
	return {
		name: "C++",
		aliases: [
			"cc",
			"c++",
			"h++",
			"hpp",
			"hh",
			"hxx",
			"cxx"
		],
		keywords: CPP_KEYWORDS,
		illegal: "</",
		classNameAliases: { "function.dispatch": "built_in" },
		contains: [].concat(EXPRESSION_CONTEXT, FUNCTION_DECLARATION, FUNCTION_DISPATCH, EXPRESSION_CONTAINS, [
			...PREPROCESSORS,
			{
				begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
				end: ">",
				keywords: CPP_KEYWORDS,
				contains: ["self", CPP_PRIMITIVE_TYPES]
			},
			{
				begin: hljs.IDENT_RE + "::",
				keywords: CPP_KEYWORDS
			},
			{
				match: [
					/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
					/\s+/,
					/\w+/
				],
				className: {
					1: "keyword",
					3: "title.class"
				}
			}
		])
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/css.js
const MODES = (hljs) => {
	return {
		IMPORTANT: {
			scope: "meta",
			begin: "!important"
		},
		BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
		HEXCOLOR: {
			scope: "number",
			begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
		},
		UNICODE_RANGE: {
			scope: "number",
			begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
		},
		FUNCTION_DISPATCH: {
			className: "built_in",
			begin: /[\w-]+(?=\()/
		},
		ATTRIBUTE_SELECTOR_MODE: {
			scope: "selector-attr",
			begin: /\[/,
			end: /\]/,
			illegal: "$",
			contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
		},
		CSS_NUMBER_MODE: {
			scope: "number",
			begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
			relevance: 0
		},
		CSS_VARIABLE: {
			className: "attr",
			begin: /--[A-Za-z_][A-Za-z0-9_-]*/
		}
	};
};
const HTML_TAGS = [
	"a",
	"abbr",
	"address",
	"article",
	"aside",
	"audio",
	"b",
	"blockquote",
	"body",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"dd",
	"del",
	"details",
	"dfn",
	"div",
	"dl",
	"dt",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"mark",
	"menu",
	"nav",
	"object",
	"ol",
	"optgroup",
	"option",
	"p",
	"picture",
	"q",
	"quote",
	"samp",
	"section",
	"select",
	"source",
	"span",
	"strong",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"ul",
	"var",
	"video"
];
const SVG_TAGS = [
	"defs",
	"g",
	"marker",
	"mask",
	"pattern",
	"svg",
	"switch",
	"symbol",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feFlood",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMorphology",
	"feOffset",
	"feSpecularLighting",
	"feTile",
	"feTurbulence",
	"linearGradient",
	"radialGradient",
	"stop",
	"circle",
	"ellipse",
	"image",
	"line",
	"path",
	"polygon",
	"polyline",
	"rect",
	"text",
	"use",
	"textPath",
	"tspan",
	"foreignObject",
	"clipPath"
];
const TAGS = [...HTML_TAGS, ...SVG_TAGS];
const MEDIA_FEATURES = [
	"any-hover",
	"any-pointer",
	"aspect-ratio",
	"color",
	"color-gamut",
	"color-index",
	"device-aspect-ratio",
	"device-height",
	"device-width",
	"display-mode",
	"forced-colors",
	"grid",
	"height",
	"hover",
	"inverted-colors",
	"monochrome",
	"orientation",
	"overflow-block",
	"overflow-inline",
	"pointer",
	"prefers-color-scheme",
	"prefers-contrast",
	"prefers-reduced-motion",
	"prefers-reduced-transparency",
	"resolution",
	"scan",
	"scripting",
	"update",
	"width",
	"min-width",
	"max-width",
	"min-height",
	"max-height"
].sort().reverse();
const PSEUDO_CLASSES = [
	"active",
	"any-link",
	"blank",
	"checked",
	"current",
	"default",
	"defined",
	"dir",
	"disabled",
	"drop",
	"empty",
	"enabled",
	"first",
	"first-child",
	"first-of-type",
	"fullscreen",
	"future",
	"focus",
	"focus-visible",
	"focus-within",
	"has",
	"host",
	"host-context",
	"hover",
	"indeterminate",
	"in-range",
	"invalid",
	"is",
	"lang",
	"last-child",
	"last-of-type",
	"left",
	"link",
	"local-link",
	"not",
	"nth-child",
	"nth-col",
	"nth-last-child",
	"nth-last-col",
	"nth-last-of-type",
	"nth-of-type",
	"only-child",
	"only-of-type",
	"optional",
	"out-of-range",
	"past",
	"placeholder-shown",
	"read-only",
	"read-write",
	"required",
	"right",
	"root",
	"scope",
	"target",
	"target-within",
	"user-invalid",
	"valid",
	"visited",
	"where"
].sort().reverse();
const PSEUDO_ELEMENTS = [
	"after",
	"backdrop",
	"before",
	"cue",
	"cue-region",
	"first-letter",
	"first-line",
	"grammar-error",
	"marker",
	"part",
	"placeholder",
	"selection",
	"slotted",
	"spelling-error"
].sort().reverse();
const ATTRIBUTES = [
	"accent-color",
	"align-content",
	"align-items",
	"align-self",
	"alignment-baseline",
	"all",
	"anchor-name",
	"animation",
	"animation-composition",
	"animation-delay",
	"animation-direction",
	"animation-duration",
	"animation-fill-mode",
	"animation-iteration-count",
	"animation-name",
	"animation-play-state",
	"animation-range",
	"animation-range-end",
	"animation-range-start",
	"animation-timeline",
	"animation-timing-function",
	"appearance",
	"aspect-ratio",
	"backdrop-filter",
	"backface-visibility",
	"background",
	"background-attachment",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-image",
	"background-origin",
	"background-position",
	"background-position-x",
	"background-position-y",
	"background-repeat",
	"background-size",
	"baseline-shift",
	"block-size",
	"border",
	"border-block",
	"border-block-color",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-block-style",
	"border-block-width",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-end-end-radius",
	"border-end-start-radius",
	"border-image",
	"border-image-outset",
	"border-image-repeat",
	"border-image-slice",
	"border-image-source",
	"border-image-width",
	"border-inline",
	"border-inline-color",
	"border-inline-end",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-inline-style",
	"border-inline-width",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-start-end-radius",
	"border-start-start-radius",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-width",
	"bottom",
	"box-align",
	"box-decoration-break",
	"box-direction",
	"box-flex",
	"box-flex-group",
	"box-lines",
	"box-ordinal-group",
	"box-orient",
	"box-pack",
	"box-shadow",
	"box-sizing",
	"break-after",
	"break-before",
	"break-inside",
	"caption-side",
	"caret-color",
	"clear",
	"clip",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"color-scheme",
	"column-count",
	"column-fill",
	"column-gap",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"contain",
	"contain-intrinsic-block-size",
	"contain-intrinsic-height",
	"contain-intrinsic-inline-size",
	"contain-intrinsic-size",
	"contain-intrinsic-width",
	"container",
	"container-name",
	"container-type",
	"content",
	"content-visibility",
	"corner-bottom-left-shape",
	"corner-bottom-right-shape",
	"corner-shape",
	"corner-top-left-shape",
	"corner-top-right-shape",
	"counter-increment",
	"counter-reset",
	"counter-set",
	"cue",
	"cue-after",
	"cue-before",
	"cursor",
	"cx",
	"cy",
	"direction",
	"display",
	"dominant-baseline",
	"empty-cells",
	"enable-background",
	"field-sizing",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"flex",
	"flex-basis",
	"flex-direction",
	"flex-flow",
	"flex-grow",
	"flex-shrink",
	"flex-wrap",
	"float",
	"flood-color",
	"flood-opacity",
	"flow",
	"font",
	"font-display",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-language-override",
	"font-optical-sizing",
	"font-palette",
	"font-size",
	"font-size-adjust",
	"font-smooth",
	"font-smoothing",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-synthesis-position",
	"font-synthesis-small-caps",
	"font-synthesis-style",
	"font-synthesis-weight",
	"font-variant",
	"font-variant-alternates",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-emoji",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-variation-settings",
	"font-weight",
	"forced-color-adjust",
	"gap",
	"glyph-orientation-horizontal",
	"glyph-orientation-vertical",
	"grid",
	"grid-area",
	"grid-auto-columns",
	"grid-auto-flow",
	"grid-auto-rows",
	"grid-column",
	"grid-column-end",
	"grid-column-start",
	"grid-gap",
	"grid-row",
	"grid-row-end",
	"grid-row-start",
	"grid-template",
	"grid-template-areas",
	"grid-template-columns",
	"grid-template-rows",
	"hanging-punctuation",
	"height",
	"hyphenate-character",
	"hyphenate-limit-chars",
	"hyphens",
	"icon",
	"image-orientation",
	"image-rendering",
	"image-resolution",
	"ime-mode",
	"initial-letter",
	"initial-letter-align",
	"inline-size",
	"inset",
	"inset-area",
	"inset-block",
	"inset-block-end",
	"inset-block-start",
	"inset-inline",
	"inset-inline-end",
	"inset-inline-start",
	"isolation",
	"justify-content",
	"justify-items",
	"justify-self",
	"kerning",
	"left",
	"letter-spacing",
	"lighting-color",
	"line-break",
	"line-height",
	"line-height-step",
	"list-style",
	"list-style-image",
	"list-style-position",
	"list-style-type",
	"margin",
	"margin-block",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-inline",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-top",
	"margin-trim",
	"marker",
	"marker-end",
	"marker-mid",
	"marker-start",
	"marks",
	"mask",
	"mask-border",
	"mask-border-mode",
	"mask-border-outset",
	"mask-border-repeat",
	"mask-border-slice",
	"mask-border-source",
	"mask-border-width",
	"mask-clip",
	"mask-composite",
	"mask-image",
	"mask-mode",
	"mask-origin",
	"mask-position",
	"mask-repeat",
	"mask-size",
	"mask-type",
	"masonry-auto-flow",
	"math-depth",
	"math-shift",
	"math-style",
	"max-block-size",
	"max-height",
	"max-inline-size",
	"max-width",
	"min-block-size",
	"min-height",
	"min-inline-size",
	"min-width",
	"mix-blend-mode",
	"nav-down",
	"nav-index",
	"nav-left",
	"nav-right",
	"nav-up",
	"none",
	"normal",
	"object-fit",
	"object-position",
	"offset",
	"offset-anchor",
	"offset-distance",
	"offset-path",
	"offset-position",
	"offset-rotate",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outline-color",
	"outline-offset",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-anchor",
	"overflow-block",
	"overflow-clip-margin",
	"overflow-inline",
	"overflow-wrap",
	"overflow-x",
	"overflow-y",
	"overlay",
	"overscroll-behavior",
	"overscroll-behavior-block",
	"overscroll-behavior-inline",
	"overscroll-behavior-x",
	"overscroll-behavior-y",
	"padding",
	"padding-block",
	"padding-block-end",
	"padding-block-start",
	"padding-bottom",
	"padding-inline",
	"padding-inline-end",
	"padding-inline-start",
	"padding-left",
	"padding-right",
	"padding-top",
	"page",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"paint-order",
	"pause",
	"pause-after",
	"pause-before",
	"perspective",
	"perspective-origin",
	"place-content",
	"place-items",
	"place-self",
	"pointer-events",
	"position",
	"position-anchor",
	"position-visibility",
	"print-color-adjust",
	"quotes",
	"r",
	"resize",
	"rest",
	"rest-after",
	"rest-before",
	"right",
	"rotate",
	"row-gap",
	"ruby-align",
	"ruby-position",
	"scale",
	"scroll-behavior",
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-end",
	"scroll-margin-block-start",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-end",
	"scroll-margin-inline-start",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",
	"scroll-padding",
	"scroll-padding-block",
	"scroll-padding-block-end",
	"scroll-padding-block-start",
	"scroll-padding-bottom",
	"scroll-padding-inline",
	"scroll-padding-inline-end",
	"scroll-padding-inline-start",
	"scroll-padding-left",
	"scroll-padding-right",
	"scroll-padding-top",
	"scroll-snap-align",
	"scroll-snap-stop",
	"scroll-snap-type",
	"scroll-timeline",
	"scroll-timeline-axis",
	"scroll-timeline-name",
	"scrollbar-color",
	"scrollbar-gutter",
	"scrollbar-width",
	"shape-image-threshold",
	"shape-margin",
	"shape-outside",
	"shape-rendering",
	"speak",
	"speak-as",
	"src",
	"stop-color",
	"stop-opacity",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke-width",
	"tab-size",
	"table-layout",
	"text-align",
	"text-align-all",
	"text-align-last",
	"text-anchor",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-skip",
	"text-decoration-skip-ink",
	"text-decoration-style",
	"text-decoration-thickness",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-position",
	"text-emphasis-style",
	"text-indent",
	"text-justify",
	"text-orientation",
	"text-overflow",
	"text-rendering",
	"text-shadow",
	"text-size-adjust",
	"text-transform",
	"text-underline-offset",
	"text-underline-position",
	"text-wrap",
	"text-wrap-mode",
	"text-wrap-style",
	"timeline-scope",
	"top",
	"touch-action",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-style",
	"transition",
	"transition-behavior",
	"transition-delay",
	"transition-duration",
	"transition-property",
	"transition-timing-function",
	"translate",
	"unicode-bidi",
	"unicode-range",
	"user-modify",
	"user-select",
	"vector-effect",
	"vertical-align",
	"view-timeline",
	"view-timeline-axis",
	"view-timeline-inset",
	"view-timeline-name",
	"view-transition-name",
	"visibility",
	"voice-balance",
	"voice-duration",
	"voice-family",
	"voice-pitch",
	"voice-range",
	"voice-rate",
	"voice-stress",
	"voice-volume",
	"white-space",
	"white-space-collapse",
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"x",
	"y",
	"z-index",
	"zoom"
].sort().reverse();
/** @type LanguageFn */
function css(hljs) {
	const regex = hljs.regex;
	const modes = MODES(hljs);
	const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
	const AT_MODIFIERS = "and or not only";
	const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
	const IDENT_RE$3 = "[a-zA-Z-][a-zA-Z0-9_-]*";
	const STRINGS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];
	return {
		name: "CSS",
		case_insensitive: true,
		illegal: /[=|'\$]/,
		keywords: { keyframePosition: "from to" },
		classNameAliases: { keyframePosition: "selector-tag" },
		contains: [
			modes.BLOCK_COMMENT,
			VENDOR_PREFIX,
			modes.CSS_NUMBER_MODE,
			{
				className: "selector-id",
				begin: /#[A-Za-z0-9_-]+/,
				relevance: 0
			},
			{
				className: "selector-class",
				begin: "\\." + IDENT_RE$3,
				relevance: 0
			},
			modes.ATTRIBUTE_SELECTOR_MODE,
			{
				className: "selector-pseudo",
				variants: [{ begin: ":(" + PSEUDO_CLASSES.join("|") + ")" }, { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }]
			},
			modes.CSS_VARIABLE,
			{
				className: "attribute",
				begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
			},
			{
				begin: /:/,
				end: /[;}{]/,
				contains: [
					modes.BLOCK_COMMENT,
					modes.HEXCOLOR,
					modes.IMPORTANT,
					modes.CSS_NUMBER_MODE,
					modes.UNICODE_RANGE,
					...STRINGS,
					{
						begin: /(url|data-uri)\(/,
						end: /\)/,
						relevance: 0,
						keywords: { built_in: "url data-uri" },
						contains: [...STRINGS, {
							className: "string",
							begin: /[^)]/,
							endsWithParent: true,
							excludeEnd: true
						}]
					},
					modes.FUNCTION_DISPATCH
				]
			},
			{
				begin: regex.lookahead(/@/),
				end: "[{;]",
				relevance: 0,
				illegal: /:/,
				contains: [{
					className: "keyword",
					begin: AT_PROPERTY_RE
				}, {
					begin: /\s/,
					endsWithParent: true,
					excludeEnd: true,
					relevance: 0,
					keywords: {
						$pattern: /[a-z-]+/,
						keyword: AT_MODIFIERS,
						attribute: MEDIA_FEATURES.join(" ")
					},
					contains: [
						{
							begin: /[a-z-]+(?=:)/,
							className: "attribute"
						},
						...STRINGS,
						modes.CSS_NUMBER_MODE
					]
				}]
			},
			{
				className: "selector-tag",
				begin: "\\b(" + TAGS.join("|") + ")\\b"
			}
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/go.js
function go(hljs) {
	const KEYWORDS$2 = {
		keyword: [
			"break",
			"case",
			"chan",
			"const",
			"continue",
			"default",
			"defer",
			"else",
			"fallthrough",
			"for",
			"func",
			"go",
			"goto",
			"if",
			"import",
			"interface",
			"map",
			"package",
			"range",
			"return",
			"select",
			"struct",
			"switch",
			"type",
			"var"
		],
		type: [
			"bool",
			"byte",
			"complex64",
			"complex128",
			"error",
			"float32",
			"float64",
			"int8",
			"int16",
			"int32",
			"int64",
			"string",
			"uint8",
			"uint16",
			"uint32",
			"uint64",
			"int",
			"uint",
			"uintptr",
			"rune"
		],
		literal: [
			"true",
			"false",
			"iota",
			"nil"
		],
		built_in: [
			"append",
			"cap",
			"close",
			"complex",
			"copy",
			"imag",
			"len",
			"make",
			"new",
			"panic",
			"print",
			"println",
			"real",
			"recover",
			"delete"
		]
	};
	return {
		name: "Go",
		aliases: ["golang"],
		keywords: KEYWORDS$2,
		illegal: "</",
		contains: [
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				className: "string",
				variants: [
					hljs.QUOTE_STRING_MODE,
					hljs.APOS_STRING_MODE,
					{
						begin: "`",
						end: "`"
					}
				]
			},
			{
				className: "number",
				variants: [
					{
						match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/,
						relevance: 0
					},
					{
						match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/,
						relevance: 0
					},
					{
						match: /-?\b0[oO](_?[0-7])*i?/,
						relevance: 0
					},
					{
						match: /-?\b0[bB](_?[01])*i?/,
						relevance: 0
					},
					{
						match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/,
						relevance: 0
					},
					{
						match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/,
						relevance: 0
					}
				]
			},
			{ begin: /:=/ },
			{
				className: "function",
				beginKeywords: "func",
				end: "\\s*(\\{|$)",
				excludeEnd: true,
				contains: [hljs.TITLE_MODE, {
					className: "params",
					begin: /\(/,
					end: /\)/,
					endsParent: true,
					keywords: KEYWORDS$2,
					illegal: /["']/
				}]
			}
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/ini.js
function ini(hljs) {
	const regex = hljs.regex;
	const NUMBERS = {
		className: "number",
		relevance: 0,
		variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: hljs.NUMBER_RE }]
	};
	const COMMENTS = hljs.COMMENT();
	COMMENTS.variants = [{
		begin: /;/,
		end: /$/
	}, {
		begin: /#/,
		end: /$/
	}];
	const VARIABLES = {
		className: "variable",
		variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
	};
	const LITERALS$2 = {
		className: "literal",
		begin: /\bon|off|true|false|yes|no\b/
	};
	const STRINGS = {
		className: "string",
		contains: [hljs.BACKSLASH_ESCAPE],
		variants: [
			{
				begin: "'''",
				end: "'''",
				relevance: 10
			},
			{
				begin: "\"\"\"",
				end: "\"\"\"",
				relevance: 10
			},
			{
				begin: "\"",
				end: "\""
			},
			{
				begin: "'",
				end: "'"
			}
		]
	};
	const ARRAY = {
		begin: /\[/,
		end: /\]/,
		contains: [
			COMMENTS,
			LITERALS$2,
			VARIABLES,
			STRINGS,
			NUMBERS,
			"self"
		],
		relevance: 0
	};
	const ANY_KEY = regex.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
	return {
		name: "TOML, also INI",
		aliases: ["toml"],
		case_insensitive: true,
		illegal: /\S/,
		contains: [
			COMMENTS,
			{
				className: "section",
				begin: /\[+/,
				end: /\]+/
			},
			{
				begin: regex.concat(ANY_KEY, "(\\s*\\.\\s*", ANY_KEY, ")*", regex.lookahead(/\s*=\s*[^#\s]/)),
				className: "attr",
				starts: {
					end: /$/,
					contains: [
						COMMENTS,
						ARRAY,
						LITERALS$2,
						VARIABLES,
						STRINGS,
						NUMBERS
					]
				}
			}
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/java.js
var decimalDigits = "[0-9](_*[0-9])*";
var frac = `\\.(${decimalDigits})`;
var hexDigits = "[0-9a-fA-F](_*[0-9a-fA-F])*";
var NUMERIC = {
	className: "number",
	variants: [
		{ begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
		{ begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
		{ begin: `(${frac})[fFdD]?\\b` },
		{ begin: `\\b(${decimalDigits})[fFdD]\\b` },
		{ begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))[pP][+-]?(${decimalDigits})[fFdD]?\\b` },
		{ begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
		{ begin: `\\b0[xX](${hexDigits})[lL]?\\b` },
		{ begin: "\\b0(_*[0-7])*[lL]?\\b" },
		{ begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
	],
	relevance: 0
};
/**
* Allows recursive regex expressions to a given depth
*
* ie: recurRegex("(abc~~~)", /~~~/g, 2) becomes:
* (abc(abc(abc)))
*
* @param {string} re
* @param {RegExp} substitution (should be a g mode regex)
* @param {number} depth
* @returns {string}``
*/
function recurRegex(re, substitution, depth) {
	if (depth === -1) return "";
	return re.replace(substitution, (_) => {
		return recurRegex(re, substitution, depth - 1);
	});
}
/** @type LanguageFn */
function java(hljs) {
	const regex = hljs.regex;
	const JAVA_IDENT_RE = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*";
	const ARRAY_BRACKETS_OPTIONAL_RE = "(?:(?:\\s*\\[\\s*])+)?";
	const TYPE_ARGS_OPTIONAL_RE = recurRegex("(?:\\s*<\\s*" + ("(?:" + ("\\?(?:\\s+(?:extends|super)\\s+" + (JAVA_IDENT_RE + "<@@@>(?:(?:\\s*\\[\\s*])+)?") + ")?") + "|[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*<@@@>(?:(?:\\s*\\[\\s*])+)?)") + "(?:\\s*,\\s*(?:\\?(?:\\s+(?:extends|super)\\s+[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*<@@@>(?:(?:\\s*\\[\\s*])+)?)?|[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*<@@@>(?:(?:\\s*\\[\\s*])+)?))*\\s*>)?", /<@@@>/g, 2);
	const KEYWORDS$2 = {
		keyword: [
			"synchronized",
			"abstract",
			"private",
			"var",
			"static",
			"if",
			"const ",
			"for",
			"while",
			"strictfp",
			"finally",
			"protected",
			"import",
			"native",
			"final",
			"void",
			"enum",
			"else",
			"break",
			"transient",
			"catch",
			"instanceof",
			"volatile",
			"case",
			"assert",
			"package",
			"default",
			"public",
			"try",
			"switch",
			"continue",
			"throws",
			"protected",
			"public",
			"private",
			"module",
			"requires",
			"exports",
			"do",
			"sealed",
			"yield",
			"permits",
			"goto",
			"when"
		],
		literal: [
			"false",
			"true",
			"null"
		],
		type: [
			"char",
			"boolean",
			"long",
			"float",
			"int",
			"byte",
			"short",
			"double"
		],
		built_in: ["super", "this"]
	};
	const ANNOTATION = {
		className: "meta",
		begin: "@" + JAVA_IDENT_RE,
		contains: [{
			begin: /\(/,
			end: /\)/,
			contains: ["self"]
		}]
	};
	const PARAMS = {
		className: "params",
		begin: /\(/,
		end: /\)/,
		keywords: KEYWORDS$2,
		relevance: 0,
		contains: [hljs.C_BLOCK_COMMENT_MODE],
		endsParent: true
	};
	return {
		name: "Java",
		aliases: ["jsp"],
		keywords: KEYWORDS$2,
		illegal: /<\/|#/,
		contains: [
			hljs.COMMENT("/\\*\\*", "\\*/", {
				relevance: 0,
				contains: [{
					begin: /\w+@/,
					relevance: 0
				}, {
					className: "doctag",
					begin: "@[A-Za-z]+"
				}]
			}),
			{
				begin: /import java\.[a-z]+\./,
				keywords: "import",
				relevance: 2
			},
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				begin: /"""/,
				end: /"""/,
				className: "string",
				contains: [hljs.BACKSLASH_ESCAPE]
			},
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE,
			{
				match: [
					/\b(?:class|interface|enum|extends|implements|new)/,
					/\s+/,
					JAVA_IDENT_RE
				],
				className: {
					1: "keyword",
					3: "title.class"
				}
			},
			{
				match: /non-sealed/,
				scope: "keyword"
			},
			{
				beginKeywords: "new throw return else yield assert",
				relevance: 0
			},
			{
				begin: [
					JAVA_IDENT_RE,
					regex.concat(TYPE_ARGS_OPTIONAL_RE, ARRAY_BRACKETS_OPTIONAL_RE, /\s+/),
					JAVA_IDENT_RE,
					ARRAY_BRACKETS_OPTIONAL_RE,
					/\s*/,
					/=(?!=)/
				],
				className: {
					1: "type",
					3: "variable",
					6: "operator"
				}
			},
			{
				begin: [
					/record/,
					/\s+/,
					JAVA_IDENT_RE
				],
				className: {
					1: "keyword",
					3: "title.class"
				},
				contains: [
					PARAMS,
					hljs.C_LINE_COMMENT_MODE,
					hljs.C_BLOCK_COMMENT_MODE
				]
			},
			{
				begin: [
					JAVA_IDENT_RE,
					regex.concat(TYPE_ARGS_OPTIONAL_RE, ARRAY_BRACKETS_OPTIONAL_RE, /\s+/),
					JAVA_IDENT_RE,
					/\s*(?=\()/
				],
				className: {
					1: "type",
					3: "title.function"
				},
				keywords: KEYWORDS$2,
				contains: [
					{
						className: "params",
						begin: /\(/,
						end: /\)/,
						keywords: KEYWORDS$2,
						relevance: 0,
						contains: [
							ANNOTATION,
							hljs.APOS_STRING_MODE,
							hljs.QUOTE_STRING_MODE,
							NUMERIC,
							hljs.C_BLOCK_COMMENT_MODE
						]
					},
					hljs.C_LINE_COMMENT_MODE,
					hljs.C_BLOCK_COMMENT_MODE
				]
			},
			NUMERIC,
			ANNOTATION
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/javascript.js
const IDENT_RE$1 = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS$1 = [
	"as",
	"in",
	"of",
	"if",
	"for",
	"while",
	"finally",
	"var",
	"new",
	"function",
	"do",
	"return",
	"void",
	"else",
	"break",
	"catch",
	"instanceof",
	"with",
	"throw",
	"case",
	"default",
	"try",
	"switch",
	"continue",
	"typeof",
	"delete",
	"let",
	"yield",
	"const",
	"class",
	"debugger",
	"async",
	"await",
	"static",
	"import",
	"from",
	"export",
	"extends",
	"using"
];
const LITERALS$1 = [
	"true",
	"false",
	"null",
	"undefined",
	"NaN",
	"Infinity"
];
const TYPES$1 = [
	"Object",
	"Function",
	"Boolean",
	"Symbol",
	"Math",
	"Date",
	"Number",
	"BigInt",
	"String",
	"RegExp",
	"Array",
	"Float32Array",
	"Float64Array",
	"Int8Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"Int16Array",
	"Int32Array",
	"Uint16Array",
	"Uint32Array",
	"BigInt64Array",
	"BigUint64Array",
	"Set",
	"Map",
	"WeakSet",
	"WeakMap",
	"ArrayBuffer",
	"SharedArrayBuffer",
	"Atomics",
	"DataView",
	"JSON",
	"Promise",
	"Generator",
	"GeneratorFunction",
	"AsyncFunction",
	"Reflect",
	"Proxy",
	"Intl",
	"WebAssembly"
];
const ERROR_TYPES$1 = [
	"Error",
	"EvalError",
	"InternalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
];
const BUILT_IN_GLOBALS$1 = [
	"setInterval",
	"setTimeout",
	"clearInterval",
	"clearTimeout",
	"require",
	"exports",
	"eval",
	"isFinite",
	"isNaN",
	"parseFloat",
	"parseInt",
	"decodeURI",
	"decodeURIComponent",
	"encodeURI",
	"encodeURIComponent",
	"escape",
	"unescape"
];
const BUILT_IN_VARIABLES$1 = [
	"arguments",
	"this",
	"super",
	"console",
	"window",
	"document",
	"localStorage",
	"sessionStorage",
	"module",
	"self",
	"global"
];
const BUILT_INS$1 = [].concat(BUILT_IN_GLOBALS$1, TYPES$1, ERROR_TYPES$1);
/** @type LanguageFn */
function javascript(hljs) {
	const regex = hljs.regex;
	/**
	* Takes a string like "<Booger" and checks to see
	* if we can find a matching "</Booger" later in the
	* content.
	* @param {RegExpMatchArray} match
	* @param {{after:number}} param1
	*/
	const hasClosingTag = (match, { after }) => {
		const tag = "</" + match[0].slice(1);
		return match.input.indexOf(tag, after) !== -1;
	};
	const IDENT_RE$1$1 = IDENT_RE$1;
	const FRAGMENT = {
		begin: "<>",
		end: "</>"
	};
	const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
	const XML_TAG = {
		begin: /<[A-Za-z0-9\\._:-]+/,
		end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
		isTrulyOpeningTag: (match, response) => {
			const afterMatchIndex = match[0].length + match.index;
			const nextChar = match.input[afterMatchIndex];
			if (nextChar === "<" || nextChar === ",") {
				response.ignoreMatch();
				return;
			}
			if (nextChar === ">") {
				if (!hasClosingTag(match, { after: afterMatchIndex })) response.ignoreMatch();
			}
			let m;
			const afterMatch = match.input.substring(afterMatchIndex);
			if (m = afterMatch.match(/^\s*=/)) {
				response.ignoreMatch();
				return;
			}
			if (m = afterMatch.match(/^\s+extends\s+/)) {
				if (m.index === 0) {
					response.ignoreMatch();
					return;
				}
			}
		}
	};
	const KEYWORDS$1$1 = {
		$pattern: IDENT_RE$1,
		keyword: KEYWORDS$1,
		literal: LITERALS$1,
		built_in: BUILT_INS$1,
		"variable.language": BUILT_IN_VARIABLES$1
	};
	const decimalDigits$1 = "[0-9](_?[0-9])*";
	const frac$1 = `\\.(${decimalDigits$1})`;
	const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
	const NUMBER = {
		className: "number",
		variants: [
			{ begin: `(\\b(${decimalInteger})((${frac$1})|\\.)?|(${frac$1}))[eE][+-]?(${decimalDigits$1})\\b` },
			{ begin: `\\b(${decimalInteger})\\b((${frac$1})\\b|\\.)?|(${frac$1})\\b` },
			{ begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
			{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
			{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
			{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
			{ begin: "\\b0[0-7]+n?\\b" }
		],
		relevance: 0
	};
	const SUBST = {
		className: "subst",
		begin: "\\$\\{",
		end: "\\}",
		keywords: KEYWORDS$1$1,
		contains: []
	};
	const HTML_TEMPLATE = {
		begin: ".?html`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "xml"
		}
	};
	const CSS_TEMPLATE = {
		begin: ".?css`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "css"
		}
	};
	const GRAPHQL_TEMPLATE = {
		begin: ".?gql`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "graphql"
		}
	};
	const TEMPLATE_STRING = {
		className: "string",
		begin: "`",
		end: "`",
		contains: [hljs.BACKSLASH_ESCAPE, SUBST]
	};
	const COMMENT$1 = {
		className: "comment",
		variants: [
			hljs.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
				relevance: 0,
				contains: [{
					begin: "(?=@[A-Za-z]+)",
					relevance: 0,
					contains: [
						{
							className: "doctag",
							begin: "@[A-Za-z]+"
						},
						{
							className: "type",
							begin: "\\{",
							end: "\\}",
							excludeEnd: true,
							excludeBegin: true,
							relevance: 0
						},
						{
							className: "variable",
							begin: IDENT_RE$1$1 + "(?=\\s*(-)|$)",
							endsParent: true,
							relevance: 0
						},
						{
							begin: /(?=[^\n])\s/,
							relevance: 0
						}
					]
				}]
			}),
			hljs.C_BLOCK_COMMENT_MODE,
			hljs.C_LINE_COMMENT_MODE
		]
	};
	const SUBST_INTERNALS = [
		hljs.APOS_STRING_MODE,
		hljs.QUOTE_STRING_MODE,
		HTML_TEMPLATE,
		CSS_TEMPLATE,
		GRAPHQL_TEMPLATE,
		TEMPLATE_STRING,
		{ match: /\$\d+/ },
		NUMBER
	];
	SUBST.contains = SUBST_INTERNALS.concat({
		begin: /\{/,
		end: /\}/,
		keywords: KEYWORDS$1$1,
		contains: ["self"].concat(SUBST_INTERNALS)
	});
	const SUBST_AND_COMMENTS = [].concat(COMMENT$1, SUBST.contains);
	const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([{
		begin: /(\s*)\(/,
		end: /\)/,
		keywords: KEYWORDS$1$1,
		contains: ["self"].concat(SUBST_AND_COMMENTS)
	}]);
	const PARAMS = {
		className: "params",
		begin: /(\s*)\(/,
		end: /\)/,
		excludeBegin: true,
		excludeEnd: true,
		keywords: KEYWORDS$1$1,
		contains: PARAMS_CONTAINS
	};
	const CLASS_OR_EXTENDS = { variants: [{
		match: [
			/class/,
			/\s+/,
			IDENT_RE$1$1,
			/\s+/,
			/extends/,
			/\s+/,
			regex.concat(IDENT_RE$1$1, "(", regex.concat(/\./, IDENT_RE$1$1), ")*")
		],
		scope: {
			1: "keyword",
			3: "title.class",
			5: "keyword",
			7: "title.class.inherited"
		}
	}, {
		match: [
			/class/,
			/\s+/,
			IDENT_RE$1$1
		],
		scope: {
			1: "keyword",
			3: "title.class"
		}
	}] };
	const CLASS_REFERENCE = {
		relevance: 0,
		match: regex.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
		className: "title.class",
		keywords: { _: [...TYPES$1, ...ERROR_TYPES$1] }
	};
	const USE_STRICT = {
		label: "use_strict",
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use (strict|asm)['"]/
	};
	const FUNCTION_DEFINITION = {
		variants: [{ match: [
			/function/,
			/\s+/,
			IDENT_RE$1$1,
			/(?=\s*\()/
		] }, { match: [/function/, /\s*(?=\()/] }],
		className: {
			1: "keyword",
			3: "title.function"
		},
		label: "func.def",
		contains: [PARAMS],
		illegal: /%/
	};
	const UPPER_CASE_CONSTANT = {
		relevance: 0,
		match: /\b[A-Z][A-Z_0-9]+\b/,
		className: "variable.constant"
	};
	function noneOf(list) {
		return regex.concat("(?!", list.join("|"), ")");
	}
	const FUNCTION_CALL = {
		match: regex.concat(/\b/, noneOf([
			...BUILT_IN_GLOBALS$1,
			"super",
			"import",
			"await"
		].map((x) => `${x}\\s*\\(`)), IDENT_RE$1$1, regex.lookahead(/\s*\(/)),
		className: "title.function",
		relevance: 0
	};
	const PROPERTY_ACCESS = {
		begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE$1$1, /(?![0-9A-Za-z$_(])/))),
		end: IDENT_RE$1$1,
		excludeBegin: true,
		keywords: "prototype",
		className: "property",
		relevance: 0
	};
	const GETTER_OR_SETTER = {
		match: [
			/get|set/,
			/\s+/,
			IDENT_RE$1$1,
			/(?=\()/
		],
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [{ begin: /\(\)/ }, PARAMS]
	};
	const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
	const FUNCTION_VARIABLE = {
		match: [
			/const|var|let/,
			/\s+/,
			IDENT_RE$1$1,
			/\s*/,
			/=\s*/,
			/(async\s*)?/,
			regex.lookahead(FUNC_LEAD_IN_RE)
		],
		keywords: "async",
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [PARAMS]
	};
	return {
		name: "JavaScript",
		aliases: [
			"js",
			"jsx",
			"mjs",
			"cjs"
		],
		keywords: KEYWORDS$1$1,
		exports: {
			PARAMS_CONTAINS,
			CLASS_REFERENCE
		},
		illegal: /#(?![$_A-Za-z])/,
		contains: [
			hljs.SHEBANG({
				label: "shebang",
				binary: "node",
				relevance: 5
			}),
			USE_STRICT,
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE,
			HTML_TEMPLATE,
			CSS_TEMPLATE,
			GRAPHQL_TEMPLATE,
			TEMPLATE_STRING,
			COMMENT$1,
			{ match: /\$\d+/ },
			NUMBER,
			CLASS_REFERENCE,
			{
				scope: "attr",
				match: IDENT_RE$1$1 + regex.lookahead(":"),
				relevance: 0
			},
			FUNCTION_VARIABLE,
			{
				begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					COMMENT$1,
					hljs.REGEXP_MODE,
					{
						className: "function",
						begin: FUNC_LEAD_IN_RE,
						returnBegin: true,
						end: "\\s*=>",
						contains: [{
							className: "params",
							variants: [
								{
									begin: hljs.UNDERSCORE_IDENT_RE,
									relevance: 0
								},
								{
									className: null,
									begin: /\(\s*\)/,
									skip: true
								},
								{
									begin: /(\s*)\(/,
									end: /\)/,
									excludeBegin: true,
									excludeEnd: true,
									keywords: KEYWORDS$1$1,
									contains: PARAMS_CONTAINS
								}
							]
						}]
					},
					{
						begin: /,/,
						relevance: 0
					},
					{
						match: /\s+/,
						relevance: 0
					},
					{
						variants: [
							{
								begin: FRAGMENT.begin,
								end: FRAGMENT.end
							},
							{ match: XML_SELF_CLOSING },
							{
								begin: XML_TAG.begin,
								"on:begin": XML_TAG.isTrulyOpeningTag,
								end: XML_TAG.end
							}
						],
						subLanguage: "xml",
						contains: [{
							begin: XML_TAG.begin,
							end: XML_TAG.end,
							skip: true,
							contains: ["self"]
						}]
					}
				]
			},
			FUNCTION_DEFINITION,
			{ beginKeywords: "while if switch catch for" },
			{
				begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: true,
				label: "func.def",
				contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {
					begin: IDENT_RE$1$1,
					className: "title.function"
				})]
			},
			{
				match: /\.\.\./,
				relevance: 0
			},
			PROPERTY_ACCESS,
			{
				match: "\\$" + IDENT_RE$1$1,
				relevance: 0
			},
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [PARAMS]
			},
			FUNCTION_CALL,
			UPPER_CASE_CONSTANT,
			CLASS_OR_EXTENDS,
			GETTER_OR_SETTER,
			{ match: /\$[(.]/ }
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/json.js
const EXTENDED_NUMBER_MODE = {
	scope: "number",
	match: "([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity",
	relevance: 0
};
function json(hljs) {
	const ATTRIBUTE = {
		className: "attr",
		begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
		relevance: 1.01
	};
	const PUNCTUATION = {
		match: /[{}[\],:]/,
		className: "punctuation",
		relevance: 0
	};
	const LITERALS$2 = [
		"true",
		"false",
		"null"
	];
	const LITERALS_MODE = {
		scope: "literal",
		beginKeywords: LITERALS$2.join(" ")
	};
	return {
		name: "JSON",
		aliases: ["jsonc", "json5"],
		keywords: { literal: LITERALS$2 },
		contains: [
			ATTRIBUTE,
			PUNCTUATION,
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE,
			LITERALS_MODE,
			EXTENDED_NUMBER_MODE,
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		],
		illegal: "\\S"
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/powershell.js
function powershell(hljs) {
	const TYPES$2 = [
		"string",
		"char",
		"byte",
		"int",
		"long",
		"bool",
		"decimal",
		"single",
		"double",
		"DateTime",
		"xml",
		"array",
		"hashtable",
		"void"
	];
	const VALID_VERBS = "Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|Unprotect|Use|ForEach|Sort|Tee|Where";
	const COMPARISON_OPERATORS = "-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|-split|-wildcard|-xor";
	const KEYWORDS$2 = {
		$pattern: /-?[A-z\.\-]+\b/,
		keyword: "if else foreach return do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch hidden static parameter",
		built_in: "ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write"
	};
	const TITLE_NAME_RE = /\w[\w\d]*((-)[\w\d]+)*/;
	const BACKTICK_ESCAPE = {
		begin: "`[\\s\\S]",
		relevance: 0
	};
	const VAR = {
		className: "variable",
		variants: [
			{ begin: /\$\B/ },
			{
				className: "keyword",
				begin: /\$this/
			},
			{ begin: /\$[\w\d][\w\d_:]*/ }
		]
	};
	const LITERAL = {
		className: "literal",
		begin: /\$(null|true|false)\b/
	};
	const QUOTE_STRING = {
		className: "string",
		variants: [{
			begin: /"/,
			end: /"/
		}, {
			begin: /@"/,
			end: /^"@/
		}],
		contains: [
			BACKTICK_ESCAPE,
			VAR,
			{
				className: "variable",
				begin: /\$[A-z]/,
				end: /[^A-z]/
			}
		]
	};
	const APOS_STRING = {
		className: "string",
		variants: [{
			begin: /'/,
			end: /'/
		}, {
			begin: /@'/,
			end: /^'@/
		}]
	};
	const PS_COMMENT = hljs.inherit(hljs.COMMENT(null, null), {
		variants: [{
			begin: /#/,
			end: /$/
		}, {
			begin: /<#/,
			end: /#>/
		}],
		contains: [{
			className: "doctag",
			variants: [{ begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/ }, { begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/ }]
		}]
	});
	const CMDLETS = {
		className: "built_in",
		variants: [{ begin: "(".concat(VALID_VERBS, ")+(-)[\\w\\d]+") }]
	};
	const PS_CLASS = {
		className: "class",
		beginKeywords: "class enum",
		end: /\s*[{]/,
		excludeEnd: true,
		relevance: 0,
		contains: [hljs.TITLE_MODE]
	};
	const PS_FUNCTION = {
		className: "function",
		begin: /function\s+/,
		end: /\s*\{|$/,
		excludeEnd: true,
		returnBegin: true,
		relevance: 0,
		contains: [
			{
				begin: "function",
				relevance: 0,
				className: "keyword"
			},
			{
				className: "title",
				begin: TITLE_NAME_RE,
				relevance: 0
			},
			{
				begin: /\(/,
				end: /\)/,
				className: "params",
				relevance: 0,
				contains: [VAR]
			}
		]
	};
	const PS_USING = {
		begin: /using\s/,
		end: /$/,
		returnBegin: true,
		contains: [
			QUOTE_STRING,
			APOS_STRING,
			{
				className: "keyword",
				begin: /(using|assembly|command|module|namespace|type)/
			}
		]
	};
	const PS_ARGUMENTS = { variants: [{
		className: "operator",
		begin: "(".concat(COMPARISON_OPERATORS, ")\\b")
	}, {
		className: "literal",
		begin: /(-){1,2}[\w\d-]+/,
		relevance: 0
	}] };
	const HASH_SIGNS = {
		className: "selector-tag",
		begin: /@\B/,
		relevance: 0
	};
	const PS_METHODS = {
		className: "function",
		begin: /\[.*\]\s*[\w]+[ ]??\(/,
		end: /$/,
		returnBegin: true,
		relevance: 0,
		contains: [{
			className: "keyword",
			begin: "(".concat(KEYWORDS$2.keyword.toString().replace(/\s/g, "|"), ")\\b"),
			endsParent: true,
			relevance: 0
		}, hljs.inherit(hljs.TITLE_MODE, { endsParent: true })]
	};
	const GENTLEMANS_SET = [
		PS_METHODS,
		PS_COMMENT,
		BACKTICK_ESCAPE,
		hljs.NUMBER_MODE,
		QUOTE_STRING,
		APOS_STRING,
		CMDLETS,
		VAR,
		LITERAL,
		HASH_SIGNS
	];
	const PS_TYPE = {
		begin: /\[/,
		end: /\]/,
		excludeBegin: true,
		excludeEnd: true,
		relevance: 0,
		contains: [].concat("self", GENTLEMANS_SET, {
			begin: "(" + TYPES$2.join("|") + ")",
			className: "built_in",
			relevance: 0
		}, {
			className: "type",
			begin: /[\.\w\d]+/,
			relevance: 0
		})
	};
	PS_METHODS.contains.unshift(PS_TYPE);
	return {
		name: "PowerShell",
		aliases: [
			"pwsh",
			"ps",
			"ps1"
		],
		case_insensitive: true,
		keywords: KEYWORDS$2,
		contains: GENTLEMANS_SET.concat(PS_CLASS, PS_FUNCTION, PS_USING, PS_ARGUMENTS, PS_TYPE)
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/python.js
function python(hljs) {
	const regex = hljs.regex;
	const IDENT_RE$3 = /[\p{XID_Start}_]\p{XID_Continue}*/u;
	const RESERVED_WORDS = [
		"and",
		"as",
		"assert",
		"async",
		"await",
		"break",
		"case",
		"class",
		"continue",
		"def",
		"del",
		"elif",
		"else",
		"except",
		"finally",
		"for",
		"from",
		"global",
		"if",
		"import",
		"in",
		"is",
		"lambda",
		"lazy",
		"match",
		"nonlocal|10",
		"not",
		"or",
		"pass",
		"raise",
		"return",
		"try",
		"while",
		"with",
		"yield"
	];
	const KEYWORDS$2 = {
		$pattern: /[A-Za-z]\w+|__\w+__/,
		keyword: RESERVED_WORDS,
		built_in: [
			"__import__",
			"abs",
			"aiter",
			"all",
			"anext",
			"any",
			"ascii",
			"bin",
			"bool",
			"breakpoint",
			"bytearray",
			"bytes",
			"callable",
			"chr",
			"classmethod",
			"compile",
			"complex",
			"delattr",
			"dict",
			"dir",
			"divmod",
			"enumerate",
			"eval",
			"exec",
			"filter",
			"float",
			"format",
			"frozendict",
			"frozenset",
			"getattr",
			"globals",
			"hasattr",
			"hash",
			"help",
			"hex",
			"id",
			"input",
			"int",
			"isinstance",
			"issubclass",
			"iter",
			"len",
			"list",
			"locals",
			"map",
			"max",
			"memoryview",
			"min",
			"next",
			"object",
			"oct",
			"open",
			"ord",
			"pow",
			"print",
			"property",
			"range",
			"repr",
			"reversed",
			"round",
			"sentinel",
			"set",
			"setattr",
			"slice",
			"sorted",
			"staticmethod",
			"str",
			"sum",
			"super",
			"tuple",
			"type",
			"vars",
			"zip"
		],
		literal: [
			"__debug__",
			"Ellipsis",
			"False",
			"None",
			"NotImplemented",
			"True"
		],
		type: [
			"Any",
			"Callable",
			"Coroutine",
			"Dict",
			"List",
			"Literal",
			"Generic",
			"Optional",
			"Sequence",
			"Set",
			"Tuple",
			"Type",
			"Union"
		]
	};
	const PROMPT = {
		className: "meta",
		begin: /^(>>>|\.\.\.) /
	};
	const SUBST = {
		className: "subst",
		begin: /\{/,
		end: /\}/,
		keywords: KEYWORDS$2,
		illegal: /#/
	};
	const LITERAL_BRACKET = {
		begin: /\{\{/,
		relevance: 0
	};
	const STRING = {
		className: "string",
		contains: [hljs.BACKSLASH_ESCAPE],
		variants: [
			{
				begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
				end: /'''/,
				contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
				relevance: 10
			},
			{
				begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
				end: /"""/,
				contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
				relevance: 10
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'''/,
				end: /'''/,
				contains: [
					hljs.BACKSLASH_ESCAPE,
					PROMPT,
					LITERAL_BRACKET,
					SUBST
				]
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"""/,
				end: /"""/,
				contains: [
					hljs.BACKSLASH_ESCAPE,
					PROMPT,
					LITERAL_BRACKET,
					SUBST
				]
			},
			{
				begin: /([uU]|[rR])'/,
				end: /'/,
				relevance: 10
			},
			{
				begin: /([uU]|[rR])"/,
				end: /"/,
				relevance: 10
			},
			{
				begin: /([bB]|[bB][rR]|[rR][bB])'/,
				end: /'/
			},
			{
				begin: /([bB]|[bB][rR]|[rR][bB])"/,
				end: /"/
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'/,
				end: /'/,
				contains: [
					hljs.BACKSLASH_ESCAPE,
					LITERAL_BRACKET,
					SUBST
				]
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"/,
				end: /"/,
				contains: [
					hljs.BACKSLASH_ESCAPE,
					LITERAL_BRACKET,
					SUBST
				]
			},
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE
		]
	};
	const digitpart = "[0-9](_?[0-9])*";
	const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
	const lookahead$1 = `\\b|${RESERVED_WORDS.join("|")}`;
	const NUMBER = {
		className: "number",
		relevance: 0,
		variants: [
			{ begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead$1})` },
			{ begin: `(${pointfloat})[jJ]?` },
			{ begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead$1})` },
			{ begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead$1})` },
			{ begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead$1})` },
			{ begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead$1})` },
			{ begin: `\\b(${digitpart})[jJ](?=${lookahead$1})` }
		]
	};
	const COMMENT_TYPE = {
		className: "comment",
		begin: regex.lookahead(/# type:/),
		end: /$/,
		keywords: KEYWORDS$2,
		contains: [{ begin: /# type:/ }, {
			begin: /#/,
			end: /\b\B/,
			endsWithParent: true
		}]
	};
	const PARAMS = {
		className: "params",
		variants: [{
			className: "",
			begin: /\(\s*\)/,
			skip: true
		}, {
			begin: /\(/,
			end: /\)/,
			excludeBegin: true,
			excludeEnd: true,
			keywords: KEYWORDS$2,
			contains: [
				"self",
				PROMPT,
				NUMBER,
				STRING,
				hljs.HASH_COMMENT_MODE
			]
		}]
	};
	SUBST.contains = [
		STRING,
		NUMBER,
		PROMPT
	];
	return {
		name: "Python",
		aliases: [
			"py",
			"gyp",
			"ipython"
		],
		unicodeRegex: true,
		keywords: KEYWORDS$2,
		illegal: /(<\/|\?)|=>/,
		contains: [
			PROMPT,
			NUMBER,
			{
				scope: "variable.language",
				match: /\bself\b/
			},
			{
				beginKeywords: "if",
				relevance: 0
			},
			{
				match: /\bor\b/,
				scope: "keyword"
			},
			STRING,
			COMMENT_TYPE,
			hljs.HASH_COMMENT_MODE,
			{
				match: [
					/\bdef/,
					/\s+/,
					IDENT_RE$3
				],
				scope: {
					1: "keyword",
					3: "title.function"
				},
				contains: [PARAMS]
			},
			{
				variants: [{ match: [
					/\bclass/,
					/\s+/,
					IDENT_RE$3,
					/\s*/,
					/\(\s*/,
					IDENT_RE$3,
					/\s*\)/
				] }, { match: [
					/\bclass/,
					/\s+/,
					IDENT_RE$3
				] }],
				scope: {
					1: "keyword",
					3: "title.class",
					6: "title.class.inherited"
				}
			},
			{
				className: "meta",
				begin: /^[\t ]*@/,
				end: /(?=#)|$/,
				contains: [
					NUMBER,
					PARAMS,
					STRING
				]
			}
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/rust.js
/** @type LanguageFn */
function rust(hljs) {
	const regex = hljs.regex;
	const RAW_IDENTIFIER = /(r#)?/;
	const UNDERSCORE_IDENT_RE$1 = regex.concat(RAW_IDENTIFIER, hljs.UNDERSCORE_IDENT_RE);
	const IDENT_RE$3 = regex.concat(RAW_IDENTIFIER, hljs.IDENT_RE);
	const FUNCTION_INVOKE = {
		scope: "title.function.invoke",
		relevance: 0,
		begin: regex.concat(/\b/, /(?!(?:let|for|while|if|else|match)\b)/, IDENT_RE$3, regex.lookahead(/\s*\(/))
	};
	const NUMBER_SUFFIX = "([ui](8|16|32|64|128|size)|f(16|32|64|128))?";
	const KEYWORDS$2 = [
		"abstract",
		"as",
		"async",
		"await",
		"become",
		"box",
		"break",
		"const",
		"continue",
		"crate",
		"do",
		"dyn",
		"else",
		"enum",
		"extern",
		"false",
		"final",
		"fn",
		"for",
		"if",
		"impl",
		"in",
		"let",
		"loop",
		"macro",
		"match",
		"mod",
		"move",
		"mut",
		"override",
		"priv",
		"pub",
		"raw",
		"ref",
		"return",
		"self",
		"Self",
		"static",
		"struct",
		"super",
		"trait",
		"true",
		"try",
		"type",
		"typeof",
		"union",
		"unsafe",
		"unsized",
		"use",
		"virtual",
		"where",
		"while",
		"yield"
	];
	const LITERALS$2 = [
		"true",
		"false",
		"Some",
		"None",
		"Ok",
		"Err"
	];
	const BUILTINS = [
		"drop ",
		"Copy",
		"Send",
		"Sized",
		"Sync",
		"Drop",
		"Fn",
		"FnMut",
		"FnOnce",
		"ToOwned",
		"Clone",
		"Debug",
		"PartialEq",
		"PartialOrd",
		"Eq",
		"Ord",
		"AsRef",
		"AsMut",
		"Into",
		"From",
		"Default",
		"Iterator",
		"Extend",
		"IntoIterator",
		"DoubleEndedIterator",
		"ExactSizeIterator",
		"SliceConcatExt",
		"ToString",
		"assert!",
		"assert_eq!",
		"bitflags!",
		"bytes!",
		"cfg!",
		"col!",
		"concat!",
		"concat_idents!",
		"debug_assert!",
		"debug_assert_eq!",
		"env!",
		"eprintln!",
		"panic!",
		"file!",
		"format!",
		"format_args!",
		"include_bytes!",
		"include_str!",
		"line!",
		"local_data_key!",
		"module_path!",
		"option_env!",
		"print!",
		"println!",
		"select!",
		"stringify!",
		"try!",
		"unimplemented!",
		"unreachable!",
		"vec!",
		"write!",
		"writeln!",
		"macro_rules!",
		"assert_ne!",
		"debug_assert_ne!"
	];
	const TYPES$2 = [
		"i8",
		"i16",
		"i32",
		"i64",
		"i128",
		"isize",
		"u8",
		"u16",
		"u32",
		"u64",
		"u128",
		"usize",
		"f16",
		"f32",
		"f64",
		"f128",
		"str",
		"char",
		"bool",
		"Box",
		"Option",
		"Result",
		"String",
		"Vec"
	];
	return {
		name: "Rust",
		aliases: ["rs"],
		keywords: {
			$pattern: hljs.IDENT_RE + "!?",
			type: TYPES$2,
			keyword: KEYWORDS$2,
			literal: LITERALS$2,
			built_in: BUILTINS
		},
		illegal: "</",
		contains: [
			hljs.C_LINE_COMMENT_MODE,
			hljs.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
			hljs.inherit(hljs.QUOTE_STRING_MODE, {
				begin: /b?"/,
				illegal: null
			}),
			{
				scope: "symbol",
				begin: /'[a-zA-Z_][a-zA-Z0-9_]*(?!')/
			},
			{
				scope: "string",
				variants: [{ begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ }, {
					begin: /b?'/,
					end: /'/,
					contains: [{
						scope: "char.escape",
						match: /\\('|"|\\|\w|x\w{2}|u\w{4}|U\w{8})/
					}]
				}]
			},
			{
				scope: "number",
				variants: [
					{ begin: "\\b0b([01_]+)" + NUMBER_SUFFIX },
					{ begin: "\\b0o([0-7_]+)" + NUMBER_SUFFIX },
					{ begin: "\\b0x([A-Fa-f0-9_]+)" + NUMBER_SUFFIX },
					{ begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + NUMBER_SUFFIX }
				],
				relevance: 0
			},
			{
				begin: [
					/\bsafe/,
					/\s+/,
					/extern/
				],
				scope: {
					1: "keyword",
					3: "keyword"
				}
			},
			{
				begin: [
					/fn/,
					/\s+/,
					UNDERSCORE_IDENT_RE$1
				],
				scope: {
					1: "keyword",
					3: "title.function"
				}
			},
			{
				scope: "meta",
				begin: "#!?\\[",
				end: "\\]",
				contains: [{
					scope: "string",
					begin: /"/,
					end: /"/,
					contains: [hljs.BACKSLASH_ESCAPE]
				}]
			},
			{
				begin: [
					/let/,
					/\s+/,
					/(?:mut\s+)?/,
					UNDERSCORE_IDENT_RE$1
				],
				scope: {
					1: "keyword",
					3: "keyword",
					4: "variable"
				}
			},
			{
				begin: [
					/for/,
					/\s+/,
					UNDERSCORE_IDENT_RE$1,
					/\s+/,
					/in/
				],
				scope: {
					1: "keyword",
					3: "variable",
					5: "keyword"
				}
			},
			{
				begin: [
					/type/,
					/\s+/,
					UNDERSCORE_IDENT_RE$1
				],
				scope: {
					1: "keyword",
					3: "title.class"
				}
			},
			{
				begin: [
					/(?:trait|enum|struct|union|impl|for)/,
					/\s+/,
					UNDERSCORE_IDENT_RE$1
				],
				scope: {
					1: "keyword",
					3: "title.class"
				}
			},
			{
				begin: hljs.IDENT_RE + "::",
				keywords: {
					keyword: "Self",
					built_in: BUILTINS,
					type: TYPES$2
				}
			},
			{
				scope: "punctuation",
				begin: "->"
			},
			FUNCTION_INVOKE
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/sql.js
function sql(hljs) {
	const regex = hljs.regex;
	const COMMENT_MODE = hljs.COMMENT("--", "$");
	const STRING = {
		scope: "string",
		variants: [{
			begin: /'/,
			end: /'/,
			contains: [{ match: /''/ }]
		}]
	};
	const QUOTED_IDENTIFIER = {
		begin: /"/,
		end: /"/,
		contains: [{ match: /""/ }]
	};
	const LITERALS$2 = [
		"true",
		"false",
		"unknown"
	];
	const MULTI_WORD_TYPES = [
		"double precision",
		"large object",
		"with timezone",
		"without timezone"
	];
	const TYPES$2 = [
		"bigint",
		"binary",
		"blob",
		"boolean",
		"char",
		"character",
		"clob",
		"date",
		"dec",
		"decfloat",
		"decimal",
		"float",
		"int",
		"integer",
		"interval",
		"nchar",
		"nclob",
		"national",
		"numeric",
		"real",
		"row",
		"smallint",
		"time",
		"timestamp",
		"varchar",
		"varying",
		"varbinary"
	];
	const NON_RESERVED_WORDS = [
		"add",
		"asc",
		"collation",
		"desc",
		"final",
		"first",
		"last",
		"view"
	];
	const RESERVED_WORDS = [
		"abs",
		"acos",
		"all",
		"allocate",
		"alter",
		"and",
		"any",
		"are",
		"array",
		"array_agg",
		"array_max_cardinality",
		"as",
		"asensitive",
		"asin",
		"asymmetric",
		"at",
		"atan",
		"atomic",
		"authorization",
		"avg",
		"begin",
		"begin_frame",
		"begin_partition",
		"between",
		"bigint",
		"binary",
		"blob",
		"boolean",
		"both",
		"by",
		"call",
		"called",
		"cardinality",
		"cascaded",
		"case",
		"cast",
		"ceil",
		"ceiling",
		"char",
		"char_length",
		"character",
		"character_length",
		"check",
		"classifier",
		"clob",
		"close",
		"coalesce",
		"collate",
		"collect",
		"column",
		"commit",
		"condition",
		"connect",
		"constraint",
		"contains",
		"convert",
		"copy",
		"corr",
		"corresponding",
		"cos",
		"cosh",
		"count",
		"covar_pop",
		"covar_samp",
		"create",
		"cross",
		"cube",
		"cume_dist",
		"current",
		"current_catalog",
		"current_date",
		"current_default_transform_group",
		"current_path",
		"current_role",
		"current_row",
		"current_schema",
		"current_time",
		"current_timestamp",
		"current_path",
		"current_role",
		"current_transform_group_for_type",
		"current_user",
		"cursor",
		"cycle",
		"date",
		"day",
		"deallocate",
		"dec",
		"decimal",
		"decfloat",
		"declare",
		"default",
		"define",
		"delete",
		"dense_rank",
		"deref",
		"describe",
		"deterministic",
		"disconnect",
		"distinct",
		"double",
		"drop",
		"dynamic",
		"each",
		"element",
		"else",
		"empty",
		"end",
		"end_frame",
		"end_partition",
		"end-exec",
		"equals",
		"escape",
		"every",
		"except",
		"exec",
		"execute",
		"exists",
		"exp",
		"external",
		"extract",
		"false",
		"fetch",
		"filter",
		"first_value",
		"float",
		"floor",
		"for",
		"foreign",
		"frame_row",
		"free",
		"from",
		"full",
		"function",
		"fusion",
		"get",
		"global",
		"grant",
		"group",
		"grouping",
		"groups",
		"having",
		"hold",
		"hour",
		"identity",
		"in",
		"indicator",
		"initial",
		"inner",
		"inout",
		"insensitive",
		"insert",
		"int",
		"integer",
		"intersect",
		"intersection",
		"interval",
		"into",
		"is",
		"join",
		"json_array",
		"json_arrayagg",
		"json_exists",
		"json_object",
		"json_objectagg",
		"json_query",
		"json_table",
		"json_table_primitive",
		"json_value",
		"lag",
		"language",
		"large",
		"last_value",
		"lateral",
		"lead",
		"leading",
		"left",
		"like",
		"like_regex",
		"listagg",
		"ln",
		"local",
		"localtime",
		"localtimestamp",
		"log",
		"log10",
		"lower",
		"match",
		"match_number",
		"match_recognize",
		"matches",
		"max",
		"member",
		"merge",
		"method",
		"min",
		"minute",
		"mod",
		"modifies",
		"module",
		"month",
		"multiset",
		"national",
		"natural",
		"nchar",
		"nclob",
		"new",
		"no",
		"none",
		"normalize",
		"not",
		"nth_value",
		"ntile",
		"null",
		"nullif",
		"numeric",
		"octet_length",
		"occurrences_regex",
		"of",
		"offset",
		"old",
		"omit",
		"on",
		"one",
		"only",
		"open",
		"or",
		"order",
		"out",
		"outer",
		"over",
		"overlaps",
		"overlay",
		"parameter",
		"partition",
		"pattern",
		"per",
		"percent",
		"percent_rank",
		"percentile_cont",
		"percentile_disc",
		"period",
		"portion",
		"position",
		"position_regex",
		"power",
		"precedes",
		"precision",
		"prepare",
		"primary",
		"procedure",
		"ptf",
		"range",
		"rank",
		"reads",
		"real",
		"recursive",
		"ref",
		"references",
		"referencing",
		"regr_avgx",
		"regr_avgy",
		"regr_count",
		"regr_intercept",
		"regr_r2",
		"regr_slope",
		"regr_sxx",
		"regr_sxy",
		"regr_syy",
		"release",
		"result",
		"return",
		"returns",
		"revoke",
		"right",
		"rollback",
		"rollup",
		"row",
		"row_number",
		"rows",
		"running",
		"savepoint",
		"scope",
		"scroll",
		"search",
		"second",
		"seek",
		"select",
		"sensitive",
		"session_user",
		"set",
		"show",
		"similar",
		"sin",
		"sinh",
		"skip",
		"smallint",
		"some",
		"specific",
		"specifictype",
		"sql",
		"sqlexception",
		"sqlstate",
		"sqlwarning",
		"sqrt",
		"start",
		"static",
		"stddev_pop",
		"stddev_samp",
		"submultiset",
		"subset",
		"substring",
		"substring_regex",
		"succeeds",
		"sum",
		"symmetric",
		"system",
		"system_time",
		"system_user",
		"table",
		"tablesample",
		"tan",
		"tanh",
		"then",
		"time",
		"timestamp",
		"timezone_hour",
		"timezone_minute",
		"to",
		"trailing",
		"translate",
		"translate_regex",
		"translation",
		"treat",
		"trigger",
		"trim",
		"trim_array",
		"true",
		"truncate",
		"uescape",
		"union",
		"unique",
		"unknown",
		"unnest",
		"update",
		"upper",
		"user",
		"using",
		"value",
		"values",
		"value_of",
		"var_pop",
		"var_samp",
		"varbinary",
		"varchar",
		"varying",
		"versioning",
		"when",
		"whenever",
		"where",
		"width_bucket",
		"window",
		"with",
		"within",
		"without",
		"year"
	];
	const RESERVED_FUNCTIONS = [
		"abs",
		"acos",
		"array_agg",
		"asin",
		"atan",
		"avg",
		"cast",
		"ceil",
		"ceiling",
		"coalesce",
		"corr",
		"cos",
		"cosh",
		"count",
		"covar_pop",
		"covar_samp",
		"cume_dist",
		"dense_rank",
		"deref",
		"element",
		"exp",
		"extract",
		"first_value",
		"floor",
		"json_array",
		"json_arrayagg",
		"json_exists",
		"json_object",
		"json_objectagg",
		"json_query",
		"json_table",
		"json_table_primitive",
		"json_value",
		"lag",
		"last_value",
		"lead",
		"listagg",
		"ln",
		"log",
		"log10",
		"lower",
		"max",
		"min",
		"mod",
		"nth_value",
		"ntile",
		"nullif",
		"percent_rank",
		"percentile_cont",
		"percentile_disc",
		"position",
		"position_regex",
		"power",
		"rank",
		"regr_avgx",
		"regr_avgy",
		"regr_count",
		"regr_intercept",
		"regr_r2",
		"regr_slope",
		"regr_sxx",
		"regr_sxy",
		"regr_syy",
		"row_number",
		"sin",
		"sinh",
		"sqrt",
		"stddev_pop",
		"stddev_samp",
		"substring",
		"substring_regex",
		"sum",
		"tan",
		"tanh",
		"translate",
		"translate_regex",
		"treat",
		"trim",
		"trim_array",
		"unnest",
		"upper",
		"value_of",
		"var_pop",
		"var_samp",
		"width_bucket"
	];
	const POSSIBLE_WITHOUT_PARENS = [
		"current_catalog",
		"current_date",
		"current_default_transform_group",
		"current_path",
		"current_role",
		"current_schema",
		"current_transform_group_for_type",
		"current_user",
		"session_user",
		"system_time",
		"system_user",
		"current_time",
		"localtime",
		"current_timestamp",
		"localtimestamp"
	];
	const COMBOS = [
		"create table",
		"insert into",
		"primary key",
		"foreign key",
		"not null",
		"alter table",
		"add constraint",
		"grouping sets",
		"on overflow",
		"character set",
		"respect nulls",
		"ignore nulls",
		"nulls first",
		"nulls last",
		"depth first",
		"breadth first"
	];
	const FUNCTIONS = RESERVED_FUNCTIONS;
	const KEYWORDS$2 = [...RESERVED_WORDS, ...NON_RESERVED_WORDS].filter((keyword) => {
		return !RESERVED_FUNCTIONS.includes(keyword);
	});
	const VARIABLE = {
		scope: "variable",
		match: /@[a-z0-9][a-z0-9_]*/
	};
	const OPERATOR = {
		scope: "operator",
		match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
		relevance: 0
	};
	const FUNCTION_CALL = {
		match: regex.concat(/\b/, regex.either(...FUNCTIONS), /\s*\(/),
		relevance: 0,
		keywords: { built_in: FUNCTIONS }
	};
	function kws_to_regex(list) {
		return regex.concat(/\b/, regex.either(...list.map((kw) => {
			return kw.replace(/\s+/, "\\s+");
		})), /\b/);
	}
	const MULTI_WORD_KEYWORDS = {
		scope: "keyword",
		match: kws_to_regex(COMBOS),
		relevance: 0
	};
	function reduceRelevancy(list, { exceptions, when } = {}) {
		const qualifyFn = when;
		exceptions = exceptions || [];
		return list.map((item) => {
			if (item.match(/\|\d+$/) || exceptions.includes(item)) return item;
			else if (qualifyFn(item)) return `${item}|0`;
			else return item;
		});
	}
	return {
		name: "SQL",
		case_insensitive: true,
		illegal: /[{}]|<\//,
		keywords: {
			$pattern: /\b[\w\.]+/,
			keyword: reduceRelevancy(KEYWORDS$2, { when: (x) => x.length < 3 }),
			literal: LITERALS$2,
			type: TYPES$2,
			built_in: POSSIBLE_WITHOUT_PARENS
		},
		contains: [
			{
				scope: "type",
				match: kws_to_regex(MULTI_WORD_TYPES)
			},
			MULTI_WORD_KEYWORDS,
			FUNCTION_CALL,
			VARIABLE,
			STRING,
			QUOTED_IDENTIFIER,
			hljs.C_NUMBER_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			COMMENT_MODE,
			OPERATOR
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/typescript.js
const IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS = [
	"as",
	"in",
	"of",
	"if",
	"for",
	"while",
	"finally",
	"var",
	"new",
	"function",
	"do",
	"return",
	"void",
	"else",
	"break",
	"catch",
	"instanceof",
	"with",
	"throw",
	"case",
	"default",
	"try",
	"switch",
	"continue",
	"typeof",
	"delete",
	"let",
	"yield",
	"const",
	"class",
	"debugger",
	"async",
	"await",
	"static",
	"import",
	"from",
	"export",
	"extends",
	"using"
];
const LITERALS = [
	"true",
	"false",
	"null",
	"undefined",
	"NaN",
	"Infinity"
];
const TYPES = [
	"Object",
	"Function",
	"Boolean",
	"Symbol",
	"Math",
	"Date",
	"Number",
	"BigInt",
	"String",
	"RegExp",
	"Array",
	"Float32Array",
	"Float64Array",
	"Int8Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"Int16Array",
	"Int32Array",
	"Uint16Array",
	"Uint32Array",
	"BigInt64Array",
	"BigUint64Array",
	"Set",
	"Map",
	"WeakSet",
	"WeakMap",
	"ArrayBuffer",
	"SharedArrayBuffer",
	"Atomics",
	"DataView",
	"JSON",
	"Promise",
	"Generator",
	"GeneratorFunction",
	"AsyncFunction",
	"Reflect",
	"Proxy",
	"Intl",
	"WebAssembly"
];
const ERROR_TYPES = [
	"Error",
	"EvalError",
	"InternalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
];
const BUILT_IN_GLOBALS = [
	"setInterval",
	"setTimeout",
	"clearInterval",
	"clearTimeout",
	"require",
	"exports",
	"eval",
	"isFinite",
	"isNaN",
	"parseFloat",
	"parseInt",
	"decodeURI",
	"decodeURIComponent",
	"encodeURI",
	"encodeURIComponent",
	"escape",
	"unescape"
];
const BUILT_IN_VARIABLES = [
	"arguments",
	"this",
	"super",
	"console",
	"window",
	"document",
	"localStorage",
	"sessionStorage",
	"module",
	"self",
	"global"
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, TYPES, ERROR_TYPES);
/** @type LanguageFn */
function javascript$1(hljs) {
	const regex = hljs.regex;
	/**
	* Takes a string like "<Booger" and checks to see
	* if we can find a matching "</Booger" later in the
	* content.
	* @param {RegExpMatchArray} match
	* @param {{after:number}} param1
	*/
	const hasClosingTag = (match, { after }) => {
		const tag = "</" + match[0].slice(1);
		return match.input.indexOf(tag, after) !== -1;
	};
	const IDENT_RE$1$1 = IDENT_RE;
	const FRAGMENT = {
		begin: "<>",
		end: "</>"
	};
	const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
	const XML_TAG = {
		begin: /<[A-Za-z0-9\\._:-]+/,
		end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
		isTrulyOpeningTag: (match, response) => {
			const afterMatchIndex = match[0].length + match.index;
			const nextChar = match.input[afterMatchIndex];
			if (nextChar === "<" || nextChar === ",") {
				response.ignoreMatch();
				return;
			}
			if (nextChar === ">") {
				if (!hasClosingTag(match, { after: afterMatchIndex })) response.ignoreMatch();
			}
			let m;
			const afterMatch = match.input.substring(afterMatchIndex);
			if (m = afterMatch.match(/^\s*=/)) {
				response.ignoreMatch();
				return;
			}
			if (m = afterMatch.match(/^\s+extends\s+/)) {
				if (m.index === 0) {
					response.ignoreMatch();
					return;
				}
			}
		}
	};
	const KEYWORDS$1$1 = {
		$pattern: IDENT_RE,
		keyword: KEYWORDS,
		literal: LITERALS,
		built_in: BUILT_INS,
		"variable.language": BUILT_IN_VARIABLES
	};
	const decimalDigits$1 = "[0-9](_?[0-9])*";
	const frac$1 = `\\.(${decimalDigits$1})`;
	const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
	const NUMBER = {
		className: "number",
		variants: [
			{ begin: `(\\b(${decimalInteger})((${frac$1})|\\.)?|(${frac$1}))[eE][+-]?(${decimalDigits$1})\\b` },
			{ begin: `\\b(${decimalInteger})\\b((${frac$1})\\b|\\.)?|(${frac$1})\\b` },
			{ begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
			{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
			{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
			{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
			{ begin: "\\b0[0-7]+n?\\b" }
		],
		relevance: 0
	};
	const SUBST = {
		className: "subst",
		begin: "\\$\\{",
		end: "\\}",
		keywords: KEYWORDS$1$1,
		contains: []
	};
	const HTML_TEMPLATE = {
		begin: ".?html`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "xml"
		}
	};
	const CSS_TEMPLATE = {
		begin: ".?css`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "css"
		}
	};
	const GRAPHQL_TEMPLATE = {
		begin: ".?gql`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "graphql"
		}
	};
	const TEMPLATE_STRING = {
		className: "string",
		begin: "`",
		end: "`",
		contains: [hljs.BACKSLASH_ESCAPE, SUBST]
	};
	const COMMENT$1 = {
		className: "comment",
		variants: [
			hljs.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
				relevance: 0,
				contains: [{
					begin: "(?=@[A-Za-z]+)",
					relevance: 0,
					contains: [
						{
							className: "doctag",
							begin: "@[A-Za-z]+"
						},
						{
							className: "type",
							begin: "\\{",
							end: "\\}",
							excludeEnd: true,
							excludeBegin: true,
							relevance: 0
						},
						{
							className: "variable",
							begin: IDENT_RE$1$1 + "(?=\\s*(-)|$)",
							endsParent: true,
							relevance: 0
						},
						{
							begin: /(?=[^\n])\s/,
							relevance: 0
						}
					]
				}]
			}),
			hljs.C_BLOCK_COMMENT_MODE,
			hljs.C_LINE_COMMENT_MODE
		]
	};
	const SUBST_INTERNALS = [
		hljs.APOS_STRING_MODE,
		hljs.QUOTE_STRING_MODE,
		HTML_TEMPLATE,
		CSS_TEMPLATE,
		GRAPHQL_TEMPLATE,
		TEMPLATE_STRING,
		{ match: /\$\d+/ },
		NUMBER
	];
	SUBST.contains = SUBST_INTERNALS.concat({
		begin: /\{/,
		end: /\}/,
		keywords: KEYWORDS$1$1,
		contains: ["self"].concat(SUBST_INTERNALS)
	});
	const SUBST_AND_COMMENTS = [].concat(COMMENT$1, SUBST.contains);
	const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([{
		begin: /(\s*)\(/,
		end: /\)/,
		keywords: KEYWORDS$1$1,
		contains: ["self"].concat(SUBST_AND_COMMENTS)
	}]);
	const PARAMS = {
		className: "params",
		begin: /(\s*)\(/,
		end: /\)/,
		excludeBegin: true,
		excludeEnd: true,
		keywords: KEYWORDS$1$1,
		contains: PARAMS_CONTAINS
	};
	const CLASS_OR_EXTENDS = { variants: [{
		match: [
			/class/,
			/\s+/,
			IDENT_RE$1$1,
			/\s+/,
			/extends/,
			/\s+/,
			regex.concat(IDENT_RE$1$1, "(", regex.concat(/\./, IDENT_RE$1$1), ")*")
		],
		scope: {
			1: "keyword",
			3: "title.class",
			5: "keyword",
			7: "title.class.inherited"
		}
	}, {
		match: [
			/class/,
			/\s+/,
			IDENT_RE$1$1
		],
		scope: {
			1: "keyword",
			3: "title.class"
		}
	}] };
	const CLASS_REFERENCE = {
		relevance: 0,
		match: regex.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
		className: "title.class",
		keywords: { _: [...TYPES, ...ERROR_TYPES] }
	};
	const USE_STRICT = {
		label: "use_strict",
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use (strict|asm)['"]/
	};
	const FUNCTION_DEFINITION = {
		variants: [{ match: [
			/function/,
			/\s+/,
			IDENT_RE$1$1,
			/(?=\s*\()/
		] }, { match: [/function/, /\s*(?=\()/] }],
		className: {
			1: "keyword",
			3: "title.function"
		},
		label: "func.def",
		contains: [PARAMS],
		illegal: /%/
	};
	const UPPER_CASE_CONSTANT = {
		relevance: 0,
		match: /\b[A-Z][A-Z_0-9]+\b/,
		className: "variable.constant"
	};
	function noneOf(list) {
		return regex.concat("(?!", list.join("|"), ")");
	}
	const FUNCTION_CALL = {
		match: regex.concat(/\b/, noneOf([
			...BUILT_IN_GLOBALS,
			"super",
			"import",
			"await"
		].map((x) => `${x}\\s*\\(`)), IDENT_RE$1$1, regex.lookahead(/\s*\(/)),
		className: "title.function",
		relevance: 0
	};
	const PROPERTY_ACCESS = {
		begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE$1$1, /(?![0-9A-Za-z$_(])/))),
		end: IDENT_RE$1$1,
		excludeBegin: true,
		keywords: "prototype",
		className: "property",
		relevance: 0
	};
	const GETTER_OR_SETTER = {
		match: [
			/get|set/,
			/\s+/,
			IDENT_RE$1$1,
			/(?=\()/
		],
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [{ begin: /\(\)/ }, PARAMS]
	};
	const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
	const FUNCTION_VARIABLE = {
		match: [
			/const|var|let/,
			/\s+/,
			IDENT_RE$1$1,
			/\s*/,
			/=\s*/,
			/(async\s*)?/,
			regex.lookahead(FUNC_LEAD_IN_RE)
		],
		keywords: "async",
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [PARAMS]
	};
	return {
		name: "JavaScript",
		aliases: [
			"js",
			"jsx",
			"mjs",
			"cjs"
		],
		keywords: KEYWORDS$1$1,
		exports: {
			PARAMS_CONTAINS,
			CLASS_REFERENCE
		},
		illegal: /#(?![$_A-Za-z])/,
		contains: [
			hljs.SHEBANG({
				label: "shebang",
				binary: "node",
				relevance: 5
			}),
			USE_STRICT,
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE,
			HTML_TEMPLATE,
			CSS_TEMPLATE,
			GRAPHQL_TEMPLATE,
			TEMPLATE_STRING,
			COMMENT$1,
			{ match: /\$\d+/ },
			NUMBER,
			CLASS_REFERENCE,
			{
				scope: "attr",
				match: IDENT_RE$1$1 + regex.lookahead(":"),
				relevance: 0
			},
			FUNCTION_VARIABLE,
			{
				begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					COMMENT$1,
					hljs.REGEXP_MODE,
					{
						className: "function",
						begin: FUNC_LEAD_IN_RE,
						returnBegin: true,
						end: "\\s*=>",
						contains: [{
							className: "params",
							variants: [
								{
									begin: hljs.UNDERSCORE_IDENT_RE,
									relevance: 0
								},
								{
									className: null,
									begin: /\(\s*\)/,
									skip: true
								},
								{
									begin: /(\s*)\(/,
									end: /\)/,
									excludeBegin: true,
									excludeEnd: true,
									keywords: KEYWORDS$1$1,
									contains: PARAMS_CONTAINS
								}
							]
						}]
					},
					{
						begin: /,/,
						relevance: 0
					},
					{
						match: /\s+/,
						relevance: 0
					},
					{
						variants: [
							{
								begin: FRAGMENT.begin,
								end: FRAGMENT.end
							},
							{ match: XML_SELF_CLOSING },
							{
								begin: XML_TAG.begin,
								"on:begin": XML_TAG.isTrulyOpeningTag,
								end: XML_TAG.end
							}
						],
						subLanguage: "xml",
						contains: [{
							begin: XML_TAG.begin,
							end: XML_TAG.end,
							skip: true,
							contains: ["self"]
						}]
					}
				]
			},
			FUNCTION_DEFINITION,
			{ beginKeywords: "while if switch catch for" },
			{
				begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: true,
				label: "func.def",
				contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {
					begin: IDENT_RE$1$1,
					className: "title.function"
				})]
			},
			{
				match: /\.\.\./,
				relevance: 0
			},
			PROPERTY_ACCESS,
			{
				match: "\\$" + IDENT_RE$1$1,
				relevance: 0
			},
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [PARAMS]
			},
			FUNCTION_CALL,
			UPPER_CASE_CONSTANT,
			CLASS_OR_EXTENDS,
			GETTER_OR_SETTER,
			{ match: /\$[(.]/ }
		]
	};
}
/** @type LanguageFn */
function typescript(hljs) {
	const regex = hljs.regex;
	const tsLanguage = javascript$1(hljs);
	const IDENT_RE$1$1 = IDENT_RE;
	const TYPES$2 = [
		"any",
		"void",
		"number",
		"boolean",
		"string",
		"object",
		"never",
		"symbol",
		"bigint",
		"unknown"
	];
	const NAMESPACE = {
		begin: [
			/namespace/,
			/\s+/,
			hljs.IDENT_RE
		],
		beginScope: {
			1: "keyword",
			3: "title.class"
		}
	};
	const INTERFACE = {
		beginKeywords: "interface",
		end: /\{/,
		excludeEnd: true,
		keywords: {
			keyword: "interface extends",
			built_in: TYPES$2
		},
		contains: [tsLanguage.exports.CLASS_REFERENCE]
	};
	const USE_STRICT = {
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use strict['"]/
	};
	const KEYWORDS$1$1 = {
		$pattern: IDENT_RE,
		keyword: KEYWORDS.concat([
			"type",
			"interface",
			"public",
			"private",
			"protected",
			"implements",
			"declare",
			"abstract",
			"readonly",
			"enum",
			"override",
			"satisfies"
		]),
		literal: LITERALS,
		built_in: BUILT_INS.concat(TYPES$2),
		"variable.language": BUILT_IN_VARIABLES
	};
	const DECORATOR = {
		className: "meta",
		begin: "@" + IDENT_RE$1$1
	};
	const swapMode = (mode, label, replacement) => {
		const indx = mode.contains.findIndex((m) => m.label === label);
		if (indx === -1) throw new Error("can not find mode to replace");
		mode.contains.splice(indx, 1, replacement);
	};
	Object.assign(tsLanguage.keywords, KEYWORDS$1$1);
	tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
	const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find((c$1) => c$1.scope === "attr");
	const OPTIONAL_KEY_OR_ARGUMENT = Object.assign({}, ATTRIBUTE_HIGHLIGHT, { match: regex.concat(IDENT_RE$1$1, regex.lookahead(/\s*\?:/)) });
	tsLanguage.exports.PARAMS_CONTAINS.push([
		tsLanguage.exports.CLASS_REFERENCE,
		ATTRIBUTE_HIGHLIGHT,
		OPTIONAL_KEY_OR_ARGUMENT
	]);
	tsLanguage.contains = tsLanguage.contains.concat([
		DECORATOR,
		NAMESPACE,
		INTERFACE,
		OPTIONAL_KEY_OR_ARGUMENT
	]);
	swapMode(tsLanguage, "shebang", hljs.SHEBANG());
	swapMode(tsLanguage, "use_strict", USE_STRICT);
	const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
	functionDeclaration.relevance = 0;
	Object.assign(tsLanguage, {
		name: "TypeScript",
		aliases: [
			"ts",
			"tsx",
			"mts",
			"cts"
		]
	});
	return tsLanguage;
}

//#endregion
//#region node_modules/highlight.js/es/languages/xml.js
/** @type LanguageFn */
function xml(hljs) {
	const regex = hljs.regex;
	const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
	const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
	const XML_ENTITIES = {
		className: "symbol",
		begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
	};
	const XML_META_KEYWORDS = {
		begin: /\s/,
		contains: [{
			className: "keyword",
			begin: /#?[a-z_][a-z1-9_-]+/,
			illegal: /\n/
		}]
	};
	const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
		begin: /\(/,
		end: /\)/
	});
	const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
	const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
	const TAG_INTERNALS = {
		endsWithParent: true,
		illegal: /</,
		relevance: 0,
		contains: [{
			className: "attr",
			begin: XML_IDENT_RE,
			relevance: 0
		}, {
			begin: /=\s*/,
			relevance: 0,
			contains: [{
				className: "string",
				endsParent: true,
				variants: [
					{
						begin: /"/,
						end: /"/,
						contains: [XML_ENTITIES]
					},
					{
						begin: /'/,
						end: /'/,
						contains: [XML_ENTITIES]
					},
					{ begin: /[^\s"'=<>`]+/ }
				]
			}]
		}]
	};
	return {
		name: "HTML, XML",
		aliases: [
			"html",
			"xhtml",
			"rss",
			"atom",
			"xjb",
			"xsd",
			"xsl",
			"plist",
			"wsf",
			"svg"
		],
		case_insensitive: true,
		unicodeRegex: true,
		contains: [
			{
				className: "meta",
				begin: /<![a-z]/,
				end: />/,
				relevance: 10,
				contains: [
					XML_META_KEYWORDS,
					QUOTE_META_STRING_MODE,
					APOS_META_STRING_MODE,
					XML_META_PAR_KEYWORDS,
					{
						begin: /\[/,
						end: /\]/,
						contains: [{
							className: "meta",
							begin: /<![a-z]/,
							end: />/,
							contains: [
								XML_META_KEYWORDS,
								XML_META_PAR_KEYWORDS,
								QUOTE_META_STRING_MODE,
								APOS_META_STRING_MODE
							]
						}]
					}
				]
			},
			hljs.COMMENT(/<!--/, /-->/, { relevance: 10 }),
			{
				begin: /<!\[CDATA\[/,
				end: /\]\]>/,
				relevance: 10
			},
			XML_ENTITIES,
			{
				className: "meta",
				end: /\?>/,
				variants: [{
					begin: /<\?xml/,
					relevance: 10,
					contains: [QUOTE_META_STRING_MODE]
				}, { begin: /<\?[a-z][a-z0-9]+/ }]
			},
			{
				className: "tag",
				begin: /<style(?=\s|>)/,
				end: />/,
				keywords: { name: "style" },
				contains: [TAG_INTERNALS],
				starts: {
					end: /<\/style>/,
					returnEnd: true,
					subLanguage: "css"
				}
			},
			{
				className: "tag",
				begin: /<script(?=\s|>)/,
				end: />/,
				keywords: { name: "script" },
				contains: [TAG_INTERNALS],
				starts: {
					end: /<\/script>/,
					returnEnd: true,
					subLanguage: "javascript"
				}
			},
			{
				className: "tag",
				begin: /<>|<\/>/
			},
			{
				className: "tag",
				begin: regex.concat(/</, regex.lookahead(regex.concat(TAG_NAME_RE, regex.either(/\/>/, />/, /\s/)))),
				end: /\/?>/,
				contains: [{
					className: "name",
					begin: TAG_NAME_RE,
					relevance: 0,
					starts: TAG_INTERNALS
				}]
			},
			{
				className: "tag",
				begin: regex.concat(/<\//, regex.lookahead(regex.concat(TAG_NAME_RE, />/))),
				contains: [{
					className: "name",
					begin: TAG_NAME_RE,
					relevance: 0
				}, {
					begin: />/,
					relevance: 0,
					endsParent: true
				}]
			}
		]
	};
}

//#endregion
//#region node_modules/highlight.js/es/languages/yaml.js
function yaml(hljs) {
	const LITERALS$2 = "true false yes no null";
	const URI_CHARACTERS = "[\\w#;/?:@&=+$,.~*'()[\\]]+";
	const KEY = {
		className: "attr",
		variants: [
			{ begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
			{ begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/ },
			{ begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/ }
		]
	};
	const TEMPLATE_VARIABLES = {
		className: "template-variable",
		variants: [{
			begin: /\{\{/,
			end: /\}\}/
		}, {
			begin: /%\{/,
			end: /\}/
		}]
	};
	const SINGLE_QUOTE_STRING = {
		className: "string",
		relevance: 0,
		begin: /'/,
		end: /'/,
		contains: [{
			match: /''/,
			scope: "char.escape",
			relevance: 0
		}]
	};
	const STRING = {
		className: "string",
		relevance: 0,
		variants: [{
			begin: /"/,
			end: /"/
		}, { begin: /\S+/ }],
		contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_VARIABLES]
	};
	const CONTAINER_STRING = hljs.inherit(STRING, { variants: [
		{
			begin: /'/,
			end: /'/,
			contains: [{
				begin: /''/,
				relevance: 0
			}]
		},
		{
			begin: /"/,
			end: /"/
		},
		{ begin: /[^\s,{}[\]]+/ }
	] });
	const TIMESTAMP = {
		className: "number",
		begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
	};
	const VALUE_CONTAINER = {
		end: ",",
		endsWithParent: true,
		excludeEnd: true,
		keywords: LITERALS$2,
		relevance: 0
	};
	const OBJECT = {
		begin: /\{/,
		end: /\}/,
		contains: [VALUE_CONTAINER],
		illegal: "\\n",
		relevance: 0
	};
	const ARRAY = {
		begin: "\\[",
		end: "\\]",
		contains: [VALUE_CONTAINER],
		illegal: "\\n",
		relevance: 0
	};
	const MODES$2 = [
		KEY,
		{
			className: "meta",
			begin: "^---\\s*$",
			relevance: 10
		},
		{
			className: "string",
			begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
		},
		{
			begin: "<%[%=-]?",
			end: "[%-]?%>",
			subLanguage: "ruby",
			excludeBegin: true,
			excludeEnd: true,
			relevance: 0
		},
		{
			className: "type",
			begin: "!\\w+!" + URI_CHARACTERS
		},
		{
			className: "type",
			begin: "!<" + URI_CHARACTERS + ">"
		},
		{
			className: "type",
			begin: "!" + URI_CHARACTERS
		},
		{
			className: "type",
			begin: "!!" + URI_CHARACTERS
		},
		{
			className: "meta",
			begin: "&" + hljs.UNDERSCORE_IDENT_RE + "$"
		},
		{
			className: "meta",
			begin: "\\*" + hljs.UNDERSCORE_IDENT_RE + "$"
		},
		{
			className: "bullet",
			begin: "-(?=[ ]|$)",
			relevance: 0
		},
		hljs.HASH_COMMENT_MODE,
		{
			beginKeywords: LITERALS$2,
			keywords: { literal: LITERALS$2 }
		},
		TIMESTAMP,
		{
			className: "number",
			begin: hljs.C_NUMBER_RE + "\\b",
			relevance: 0
		},
		OBJECT,
		ARRAY,
		SINGLE_QUOTE_STRING,
		STRING
	];
	const VALUE_MODES = [...MODES$2];
	VALUE_MODES.pop();
	VALUE_MODES.push(CONTAINER_STRING);
	VALUE_CONTAINER.contains = VALUE_MODES;
	return {
		name: "YAML",
		case_insensitive: true,
		aliases: ["yml"],
		contains: MODES$2
	};
}

//#endregion
//#region src/client/index.tsx
const HIGHLIGHT_LANGUAGES = [
	["bash", bash],
	["c", c],
	["cpp", cpp],
	["css", css],
	["go", go],
	["ini", ini],
	["java", java],
	["javascript", javascript],
	["json", json],
	["powershell", powershell],
	["python", python],
	["rust", rust],
	["sql", sql],
	["typescript", typescript],
	["xml", xml],
	["yaml", yaml]
];
for (const [name, language] of HIGHLIGHT_LANGUAGES) core_default.registerLanguage(name, language);
const HLJS_BY_EXTENSION = {
	js: "javascript",
	jsx: "javascript",
	mjs: "javascript",
	cjs: "javascript",
	ts: "typescript",
	tsx: "typescript",
	css: "css",
	scss: "css",
	html: "xml",
	xml: "xml",
	svg: "xml",
	vue: "xml",
	svelte: "xml",
	py: "python",
	go: "go",
	rs: "rust",
	java: "java",
	c: "c",
	h: "c",
	cpp: "cpp",
	hpp: "cpp",
	cc: "cpp",
	hh: "cpp",
	sh: "bash",
	bash: "bash",
	zsh: "bash",
	ps1: "powershell",
	sql: "sql",
	yml: "yaml",
	yaml: "yaml",
	toml: "ini",
	json: "json",
	jsonc: "json"
};
function hljsLanguageOf(path) {
	return HLJS_BY_EXTENSION[path.split(".").at(-1)?.toLowerCase() ?? ""];
}
function escapeHtml(input) {
	return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const CODE_EXTENSIONS = new Set([
	"js",
	"jsx",
	"ts",
	"tsx",
	"mjs",
	"cjs",
	"css",
	"scss",
	"html",
	"vue",
	"svelte",
	"py",
	"go",
	"rs",
	"java",
	"c",
	"h",
	"cpp",
	"hpp",
	"sh",
	"bash",
	"zsh",
	"ps1",
	"sql",
	"yml",
	"yaml",
	"toml",
	"xml"
]);
function presentationOf(path, source$1, binary, dataUrl) {
	if (source$1 === "diff") return "diff";
	if (dataUrl !== void 0) return "image";
	if (binary) return "binary";
	const extension = path.split(".").at(-1)?.toLowerCase() ?? "";
	if (extension === "md" || extension === "mdx") return "markdown";
	if (extension === "json" || extension === "jsonc") return "json";
	return CODE_EXTENSIONS.has(extension) ? "code" : "text";
}
function formattedJson(content) {
	try {
		return JSON.stringify(JSON.parse(content), null, 2);
	} catch {
		return content;
	}
}
function CodePreview({ content, diff = false, language }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "hui-code-view",
		children: (language === void 0 ? escapeHtml(content) : (() => {
			try {
				return core_default.highlight(content, { language }).value;
			} catch {
				return escapeHtml(content);
			}
		})()).split("\n").filter((line) => !diff || !/^(diff --git |index |--- |\+\+\+ |@@ |new file mode |deleted file mode |old mode |new mode |similarity index |rename from |rename to |Binary files )/.test(line)).map((line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "hui-code-line",
			"data-change": diff ? line.startsWith("+") ? "add" : line.startsWith("-") ? "delete" : void 0 : void 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: index + 1 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { dangerouslySetInnerHTML: { __html: line || " " } })]
		}, index))
	});
}
function MarkdownPreview({ content }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("article", {
		className: "hui-markdown-view",
		children: content.split("\n").map((line, index) => {
			const heading = /^(#{1,4})\s+(.+)$/.exec(line);
			if (heading !== null) {
				const level = heading[1]?.length ?? 1;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "hui-md-heading",
					"data-level": level,
					children: heading[2]
				}, index);
			}
			if (/^[-*]\s+/.test(line)) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "hui-md-list",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "•" }), line.replace(/^[-*]\s+/, "")]
			}, index);
			if (line.startsWith("> ")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("blockquote", { children: line.slice(2) }, index);
			if (line.startsWith("```")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "hui-md-fence",
				children: line.slice(3) || "code"
			}, index);
			return line.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "hui-md-space" }, index) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: line }, index);
		})
	});
}
function TerminalPanel({ sessionId, cwd }) {
	const containerRef = (0, react.useRef)(null);
	const termRef = (0, react.useRef)(null);
	const ptyIdRef = (0, react.useRef)(null);
	const sinceRef = (0, react.useRef)(0);
	const [ready, setReady] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		const container = containerRef.current;
		if (container === null) return;
		let disposed = false;
		const styles = getComputedStyle(document.documentElement);
		const backgroundColor = styles.getPropertyValue("--dsw-alias-bg-base").trim() || "#f8f8f8";
		const foregroundColor = styles.getPropertyValue("--dsw-alias-label-primary").trim() || "#172033";
		const term = new import_xterm.Terminal({
			convertEol: true,
			cursorBlink: true,
			fontFamily: "\"SFMono-Regular\",Consolas,\"Liberation Mono\",Menlo,monospace",
			fontSize: 12,
			scrollback: 5e3,
			theme: {
				background: backgroundColor,
				foreground: foregroundColor,
				cursor: foregroundColor
			}
		});
		term.open(container);
		termRef.current = term;
		const params = new URLSearchParams();
		if (sessionId !== void 0) params.set("sessionId", sessionId);
		if (cwd !== void 0) params.set("cwd", cwd);
		const query = params.size === 0 ? "" : `?${params.toString()}`;
		const request = (path, body) => {
			if (body === void 0) return fetch(`/api/v1/dsh-workspace/pty/${path}${query}`);
			return fetch(`/api/v1/dsh-workspace/pty/${path}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
		};
		request("open").then(async (response) => {
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const data = await response.json();
			if (disposed) {
				if (data.id !== void 0) request("close", { id: data.id });
				return;
			}
			if (data.id === void 0) throw new Error("未返回终端会话标识");
			ptyIdRef.current = data.id;
			sinceRef.current = 0;
			term.focus();
			setReady(true);
		}).catch((reason) => {
			if (!disposed) term.write(`\x1b[31m打开终端失败：${reason instanceof Error ? reason.message : String(reason)}\x1b[0m`);
		});
		const onData = term.onData((data) => {
			const id = ptyIdRef.current;
			if (id !== null) request("write", {
				id,
				data
			});
		});
		const onResize = term.onResize((size) => {
			const id = ptyIdRef.current;
			if (id !== null) request("resize", {
				id,
				cols: size.cols,
				rows: size.rows
			});
		});
		let timer = 0;
		const tick = () => {
			if (disposed) return;
			const id = ptyIdRef.current;
			if (id === null) {
				timer = window.setTimeout(tick, 80);
				return;
			}
			fetch(`/api/v1/dsh-workspace/pty/read?id=${encodeURIComponent(id)}&since=${sinceRef.current}`).then(async (response) => {
				if (!response.ok || disposed) return;
				const data = await response.json();
				const count = data.count ?? 0;
				if (count > sinceRef.current) {
					for (const chunk of data.output ?? []) term.write(chunk);
					sinceRef.current = count;
				}
			}).catch(() => {}).finally(() => {
				if (!disposed) timer = window.setTimeout(tick, 80);
			});
		};
		timer = window.setTimeout(tick, 80);
		return () => {
			disposed = true;
			window.clearTimeout(timer);
			onData.dispose();
			onResize.dispose();
			const id = ptyIdRef.current;
			ptyIdRef.current = null;
			if (id !== null) request("close", { id });
			term.dispose();
			termRef.current = null;
		};
	}, [cwd, sessionId]);
	const clear = (0, react.useCallback)(() => {
		termRef.current?.clear();
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "hui-terminal",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "hui-term-toolbar",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Terminal, { size: 13 }), " 终端"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "hui-term-actions",
				children: ready ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					title: "清空输出",
					"aria-label": "清空输出",
					onClick: clear,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Eraser, { size: 13 })
				}) : null
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "hui-term-screen",
			ref: containerRef
		})]
	});
}
function ProjectDrawer({ sessionId, cwd }) {
	const [snapshot, setSnapshot] = (0, react.useState)(null);
	const [mode, setMode] = (0, react.useState)("files");
	const [selected, setSelected] = (0, react.useState)(null);
	const [preview, setPreview] = (0, react.useState)("");
	const [previewSource, setPreviewSource] = (0, react.useState)("file");
	const [previewBinary, setPreviewBinary] = (0, react.useState)(false);
	const [previewDataUrl, setPreviewDataUrl] = (0, react.useState)(void 0);
	const [expanded, setExpanded] = (0, react.useState)(() => /* @__PURE__ */ new Set());
	const [error$1, setError] = (0, react.useState)(null);
	const [drawerWidth, setDrawerWidth] = (0, react.useState)(null);
	const effectiveWidth = drawerWidth ?? (selected === null ? 400 : null);
	(0, react.useEffect)(() => {
		const root = document.documentElement;
		if (effectiveWidth === null) root.style.removeProperty("--hui-drawer-width");
		else root.style.setProperty("--hui-drawer-width", `${effectiveWidth}px`);
		return () => {
			root.style.removeProperty("--hui-drawer-width");
		};
	}, [effectiveWidth]);
	const startResize = (0, react.useCallback)((event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		const drawer = event.currentTarget.parentElement;
		const startX = event.clientX;
		const startWidth = drawer === null ? 600 : drawer.getBoundingClientRect().width;
		const onMove = (move) => {
			const next = startWidth - (move.clientX - startX);
			setDrawerWidth(Math.min(Math.max(next, 320), window.innerWidth - 32));
		};
		const onUp = () => {
			document.body.style.cursor = "";
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		document.body.style.cursor = "col-resize";
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	}, [selected]);
	const refresh = (0, react.useCallback)(() => {
		setError(null);
		const params = new URLSearchParams();
		if (sessionId !== void 0) params.set("sessionId", sessionId);
		if (cwd !== void 0) params.set("cwd", cwd);
		const query = params.size === 0 ? "" : `?${params.toString()}`;
		fetch(`/api/v1/dsh-workspace/project${query}`).then(async (response) => {
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return await response.json();
		}).then(setSnapshot).catch((reason) => setError(reason instanceof Error ? reason.message : String(reason)));
	}, [cwd, sessionId]);
	(0, react.useEffect)(refresh, [refresh]);
	(0, react.useEffect)(() => {
		setSelected(null);
		setPreview("");
		setPreviewBinary(false);
		setPreviewDataUrl(void 0);
		setExpanded(/* @__PURE__ */ new Set());
	}, [sessionId]);
	const open = (0, react.useCallback)((path, kind) => {
		setSelected(path);
		setPreview("正在读取…");
		setPreviewSource(kind);
		setPreviewBinary(false);
		setPreviewDataUrl(void 0);
		const endpoint = kind === "file" ? "/api/v1/dsh-workspace/file" : "/api/v1/dsh-workspace/diff";
		const params = new URLSearchParams({ path });
		if (sessionId !== void 0) params.set("sessionId", sessionId);
		if (cwd !== void 0) params.set("cwd", cwd);
		fetch(`${endpoint}?${params.toString()}`).then(async (response) => {
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return await response.json();
		}).then((data) => {
			if ("content" in data) {
				setPreviewBinary(data.binary);
				setPreviewDataUrl(data.dataUrl);
				setPreview(data.content + (data.truncated ? "\n\n…预览已截断" : ""));
			} else setPreview((data.diff || "此变更没有可显示的文本差异") + (data.truncated ? "\n\n…预览已截断" : ""));
		}).catch((reason) => setPreview(`读取失败：${reason instanceof Error ? reason.message : String(reason)}`));
	}, [cwd, sessionId]);
	const toggleDirectory = (0, react.useCallback)((path) => {
		setExpanded((current) => {
			const next = new Set(current);
			if (next.has(path)) next.delete(path);
			else next.add(path);
			return next;
		});
	}, []);
	const visibleEntries = (snapshot?.entries ?? []).filter((entry) => {
		const segments = entry.path.split("/");
		for (let index = 1; index < segments.length; index += 1) if (!expanded.has(segments.slice(0, index).join("/"))) return false;
		return true;
	});
	const selectedName = selected?.split("/").at(-1);
	const presentation = selected === null ? "text" : presentationOf(selected, previewSource, previewBinary, previewDataUrl);
	const closeFile = (0, react.useCallback)(() => {
		setSelected(null);
		setPreview("");
		setPreviewBinary(false);
		setPreviewDataUrl(void 0);
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
		className: "hui-drawer",
		"aria-label": "项目预览",
		style: effectiveWidth === null ? void 0 : { width: effectiveWidth },
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "hui-resizer",
				"aria-hidden": "true",
				onPointerDown: startResize
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("header", {
				className: "hui-titlebar",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "hui-vscode-mark",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Blocks, { size: 14 })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					title: snapshot?.rootPath,
					children: snapshot?.rootPath ?? "正在读取当前项目…"
				})] })
			}),
			error$1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "hui-error",
				children: ["读取失败：", error$1]
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "hui-workbench",
				"data-preview": selected !== null && mode !== "terminal" || void 0,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("nav", {
						className: "hui-activity",
						"aria-label": "项目视图",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "资源管理器",
							title: "资源管理器",
							"data-active": mode === "files" || void 0,
							onClick: () => setMode("files"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FolderTree, { size: 20 })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-label": "源代码管理",
							title: "源代码管理",
							"data-active": mode === "changes" || void 0,
							onClick: () => setMode("changes"),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GitBranch, { size: 20 }), snapshot?.changes.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: snapshot.changes.length }) : null]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: "hui-explorer",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: mode === "files" ? "资源管理器" : mode === "changes" ? "源代码管理" : "终端" }), mode !== "terminal" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: refresh,
							"aria-label": "刷新",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RefreshCw, { size: 15 })
						}) : null] }), mode === "terminal" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TerminalPanel, {
							sessionId,
							cwd
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "hui-section-title",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronDown, { size: 14 }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: mode === "files" ? snapshot?.rootName?.toUpperCase() ?? "PROJECT" : "CHANGES" }),
								mode === "changes" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: snapshot?.changes.length ?? 0 }) : null
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "hui-tree",
							role: mode === "files" ? "tree" : void 0,
							children: [
								mode === "files" ? visibleEntries.map((entry) => entry.kind === "directory" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "treeitem",
									"aria-expanded": expanded.has(entry.path),
									className: "hui-tree-row",
									style: { paddingLeft: 7 + Math.min(entry.depth, 12) * 13 },
									title: entry.path,
									onClick: () => toggleDirectory(entry.path),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "hui-chevron",
										children: expanded.has(entry.path) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronDown, { size: 12 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronRight, { size: 12 })
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: entry.name })]
								}, entry.path) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									role: "treeitem",
									className: "hui-tree-row",
									"data-selected": selected === entry.path || void 0,
									style: { paddingLeft: 20 + Math.min(entry.depth, 12) * 13 },
									title: entry.path,
									onClick: () => open(entry.path, "file"),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: entry.name })
								}, entry.path)) : snapshot?.changes.map((change) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "hui-tree-row hui-change",
									"data-selected": selected === change.path || void 0,
									title: change.path,
									onClick: () => open(change.path, "diff"),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: change.path.split("/").at(-1) }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: change.path.includes("/") ? change.path.slice(0, change.path.lastIndexOf("/")) : "" }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
											"data-status": change.status,
											children: change.status
										})
									]
								}, `${change.status}:${change.path}`)),
								snapshot?.truncated ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "文件较多，列表已截断" }) : null,
								mode === "changes" && snapshot?.gitAvailable === false ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "hui-empty-small",
									children: "当前目录不是 Git 仓库"
								}) : null,
								mode === "changes" && snapshot?.gitAvailable && snapshot.changes.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "hui-empty-small",
									children: "没有待处理的更改"
								}) : null
							]
						})] })]
					}),
					selected !== null && mode !== "terminal" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: "hui-editor",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "hui-editor-tabs",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "hui-editor-tab",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selectedName }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: closeFile,
										"aria-label": `关闭 ${selectedName}`,
										title: "关闭文件",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(X, { size: 14 })
									})]
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "hui-breadcrumbs",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: selected.split("/").map((part, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [index > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronRight, { size: 10 }) : null, part] }, `${part}:${index}`)) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: presentation.toUpperCase() })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "hui-editor-surface",
								"data-presentation": presentation,
								children: presentation === "image" && previewDataUrl !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "hui-image-view",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
										src: previewDataUrl,
										alt: selectedName ?? "图片预览"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selectedName })]
								}) : presentation === "markdown" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkdownPreview, { content: preview }) : presentation === "json" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodePreview, {
									content: formattedJson(preview),
									language: hljsLanguageOf(selected ?? "")
								}) : presentation === "diff" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodePreview, {
									content: preview,
									diff: true
								}) : presentation === "code" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodePreview, {
									content: preview,
									language: hljsLanguageOf(selected ?? "")
								}) : presentation === "binary" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "hui-binary-view",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "无法预览此二进制文件" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selectedName })]
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "hui-text-view",
									children: preview
								})
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
				className: "hui-statusbar",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GitBranch, { size: 12 }),
					" ",
					snapshot?.gitAvailable ? `${snapshot.changes.length} 个更改` : "非 Git 项目"
				] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: snapshot?.rootName ?? "项目" })]
			})
		]
	});
}
function HarnessSummary({ wide, sessions }) {
	const [snapshot, setSnapshot] = (0, react.useState)(null);
	const sessionList = (0, react.useSyncExternalStore)((callback) => sessions.list.subscribe(callback), () => sessions.list.getSnapshot());
	const sessionId = sessionList.current;
	const cwd = sessionId === void 0 ? void 0 : sessionList.byId[sessionId]?.cwd;
	(0, react.useEffect)(() => {
		const controller = new AbortController();
		const load = () => void fetch("/api/v1/dsh-workspace/summary", { signal: controller.signal }).then(async (response) => response.ok ? await response.json() : null).then((value) => {
			if (value !== null) setSnapshot(value);
		}).catch(() => void 0);
		load();
		const timer = window.setInterval(load, 6e4);
		return () => {
			controller.abort();
			window.clearInterval(timer);
		};
	}, []);
	const balance = snapshot?.balance.balances.find((item) => item.currency === "CNY") ?? snapshot?.balance.balances[0];
	const cost = snapshot?.cost ?? (snapshot === null ? void 0 : {
		total: snapshot.estimatedCost.amount,
		source: "estimate"
	});
	const balanceValue = balance ? `${balance.currency} ${balance.totalBalance}` : snapshot?.balance.error ? "不可用" : "—";
	const balanceAmount = balance ? Number(balance.totalBalance) : NaN;
	const balanceTone = Number.isFinite(balanceAmount) && balanceAmount <= 10 ? "danger" : "safe";
	const period = snapshot?.ratePeriod ?? "idle";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: `hui-summary${wide ? "" : " rail"}`,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "hui-summary-main",
			"aria-label": "Harness 状态",
			title: snapshot?.balance.error,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "hui-icon",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Activity, { size: 12 })
			}), wide ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "hui-content",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "hui-metrics",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "余额" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
						"data-tone": balanceTone,
						children: balanceValue
					})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "今日" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", {
						title: cost?.source === "estimate" ? "官方接口不可用，按本地估算" : "DeepSeek 平台账单",
						children: ["¥", cost ? cost.total.toFixed(3) : "—"]
					})] })]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "hui-period",
					"data-period": period,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), period === "idle" ? "空闲" : "高峰"]
				})]
			}) : null]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProjectDrawer, {
			sessionId,
			cwd
		})]
	});
}
const STYLE_ID = "dsh-workspace-styles";
const STYLES = `
div:has(> [data-slot='sidebar.footer.action']){flex-wrap:wrap}.hui-summary{position:relative;display:flex;align-items:center;flex:0 0 100%;width:100%;min-width:0;min-height:58px;margin-top:8px}.hui-summary-main{display:flex;align-items:center;width:100%;min-height:54px;padding:5px 38px 5px 7px;overflow:hidden;border:0;border-radius:12px;background:transparent;color:var(--dsw-alias-label-primary,#172033);font:inherit}.hui-summary-main:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-icon{display:grid;place-items:center;flex:none;width:20px;height:20px;border-radius:6px;background:var(--dsw-alias-brand-primary,#4d6bfe);color:white;font-size:11px;font-weight:700}.hui-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:100%;min-width:0;gap:4px 9px;margin-left:8px;text-align:left}.hui-metrics>span{display:flex;min-width:0;align-items:baseline;gap:4px}.hui-metrics small{flex:none;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:10px}.hui-metrics b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-variant-numeric:tabular-nums}.hui-summary.rail{flex:none;width:36px;min-height:36px;margin:0}.hui-summary.rail .hui-summary-main{justify-content:center;width:36px;min-height:36px;padding:0;border-radius:50%}.hui-drawer{position:fixed;z-index:40;top:8px;right:8px;bottom:8px;display:flex;flex-direction:column;width:min(760px,calc(100vw - 24px));overflow:hidden;border:1px solid var(--dsw-alias-border-l1,#d9dde5);border-radius:14px;background:var(--dsw-alias-bg-base,#fff);box-shadow:var(--dsw-shadow-lv3,0 18px 60px #0003);color:var(--dsw-alias-label-primary,#172033)}.hui-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-header>div{display:flex;align-items:baseline;gap:10px}.hui-header span{color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-header button,.hui-tabs button{border:0;border-radius:7px;padding:6px 10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.hui-header button:hover,.hui-tabs button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tabs{display:flex;gap:4px;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-tabs button[aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);font-weight:600}.hui-error{padding:8px 12px;color:var(--dsw-alias-label-error,#d94a4a)}.hui-body{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:0;flex:1}.hui-list{overflow:auto;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);padding:6px}.hui-list button{display:flex;align-items:center;gap:7px;width:100%;padding:6px 9px;overflow:hidden;border:0;border-radius:6px;background:transparent;color:inherit;text-align:left;font:12px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;cursor:pointer}.hui-list button:hover,.hui-list button[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-list button span{overflow:hidden;text-overflow:ellipsis}.hui-list button b{min-width:20px;color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-list p{padding:8px;color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-preview{min-width:0;margin:0;padding:14px;overflow:auto;background:var(--dsw-alias-bg-module-platform,#fafbfc);font:12px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;word-break:break-word}@media(max-width:680px){.hui-body{grid-template-columns:180px minmax(0,1fr)}}
`;
const STATUS_STYLES = `
.hui-content{display:flex;align-items:center;width:100%;min-width:0;gap:8px;margin-left:8px}.hui-content .hui-metrics{display:flex;width:auto;min-width:0;flex:1;gap:10px;margin-left:0}.hui-content .hui-metrics>span{display:flex;min-width:0;flex-direction:column;align-items:flex-start;gap:0}.hui-metrics b[data-tone=safe]{color:var(--dsw-alias-label-success,#16895a)}.hui-metrics b[data-tone=danger]{color:var(--dsw-alias-label-error,#d94a4a)}.hui-period{display:inline-flex;flex:none;align-items:center;gap:4px;font-size:11px;font-weight:600}.hui-period>i{width:7px;height:7px;border-radius:50%;background:currentColor}.hui-period[data-period=idle]{color:var(--dsw-alias-label-success,#16895a)}.hui-period[data-period=peak]{color:var(--dsw-alias-label-error,#d94a4a)}
.hui-drawer{top:0;right:0;bottom:0;width:var(--hui-drawer-width,clamp(600px,46vw,780px));max-width:calc(100vw - 24px);border:0;border-left:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:0;box-shadow:-8px 0 28px #0000001c;background:var(--dsw-alias-bg-base,#f8f8f8);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.hui-resizer{position:absolute;left:0;top:0;bottom:0;z-index:5;width:5px;cursor:col-resize;touch-action:none}.hui-resizer:hover,.hui-resizer:active{background:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-titlebar{display:flex;align-items:center;justify-content:space-between;height:35px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3);user-select:none}.hui-titlebar>div{display:flex;min-width:0;align-items:center;gap:8px}.hui-titlebar span:last-child{min-width:0;flex:1;overflow:hidden;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;text-overflow:ellipsis;white-space:nowrap}.hui-vscode-mark{display:grid;width:20px;height:20px;flex:none;place-items:center;border-radius:3px;background:#007acc;color:#fff;font-size:11px;font-weight:700}.hui-titlebar button,.hui-explorer>header button{display:grid;width:26px;height:25px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;font:16px/1 sans-serif;cursor:pointer}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#e5e5e5)}
.hui-workbench{display:grid;grid-template-columns:46px minmax(0,1fr);min-height:0;flex:1}.hui-workbench[data-preview]{grid-template-columns:46px 238px minmax(0,1fr)}.hui-activity{display:flex;flex-direction:column;align-items:stretch;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3)}.hui-activity button{position:relative;display:grid;height:48px;place-items:center;border:0;border-left:2px solid transparent;background:transparent;color:var(--dsw-alias-label-tertiary,#7a7a7a);cursor:pointer}.hui-activity button:hover{color:var(--dsw-alias-label-primary,#222)}.hui-activity button[data-active]{border-left-color:#007acc;color:var(--dsw-alias-label-primary,#222)}.hui-activity button>svg{width:20px;height:20px}.hui-activity button>b{position:absolute;top:6px;right:5px;display:grid;min-width:16px;height:16px;padding:0 4px;place-items:center;border-radius:8px;background:#007acc;color:#fff;font-size:9px}
.hui-explorer{display:flex;min-width:0;min-height:0;flex-direction:column;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f8f8f8)}.hui-explorer>header{display:flex;align-items:center;justify-content:space-between;height:42px;padding:0 10px 0 16px}.hui-explorer>header strong{font-size:11px;font-weight:400;letter-spacing:.6px;text-transform:uppercase}.hui-section-title{display:flex;align-items:center;height:23px;padding:0 8px 0 4px;background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);font-size:11px;user-select:none}.hui-section-title>svg{flex:none}.hui-section-title>b{overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-section-title>em{display:grid;min-width:17px;height:17px;padding:0 4px;place-items:center;border-radius:9px;background:var(--dsw-alias-label-tertiary,#858585);color:var(--dsw-alias-bg-base,#fff);font-size:9px;font-style:normal}.hui-tree{min-height:0;overflow:auto;padding:3px 0 10px}.hui-terminal{display:flex;min-width:0;min-height:0;flex:1;flex-direction:column;background:var(--dsw-alias-bg-base,#f8f8f8);color:var(--dsw-alias-label-primary,#172033);font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;font-size:12px;line-height:1.6}.hui-term-toolbar{display:flex;align-items:center;justify-content:space-between;height:31px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a);font-size:11px;user-select:none}.hui-term-toolbar>span{display:flex;align-items:center;gap:5px}.hui-term-actions{display:flex;align-items:center;gap:2px}.hui-term-toolbar button{display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer}.hui-term-toolbar button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-term-screen{position:relative;min-width:0;min-height:0;flex:1;overflow:hidden;padding:4px 0 4px 6px}.hui-term-screen .xterm{height:100%}.hui-term-screen .xterm-viewport{overflow-y:auto}.hui-term-screen .xterm-rows{color:inherit}.hui-tree-row{display:flex;width:100%;height:23px;align-items:center;gap:4px;padding:0 8px;overflow:hidden;border:0;background:transparent;color:inherit;text-align:left;font:12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:default}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8)}.hui-tree-row[data-selected]{background:#007acc26;outline:1px solid #007acc55;outline-offset:-1px}.hui-tree-row>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hui-chevron{display:flex;width:14px;flex:none;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary,#666)}.hui-folder{width:14px;flex:none;color:#dcb67a;font-size:11px}.hui-file{width:14px;flex:none;color:#6a9fb5;font-size:13px}.hui-change{padding-left:12px;cursor:pointer}.hui-change>span:first-child{overflow:hidden;min-width:0;text-overflow:ellipsis;white-space:nowrap}.hui-change>small{overflow:hidden;flex:1;color:var(--dsw-alias-label-tertiary,#858585);font-size:10px;text-overflow:ellipsis;white-space:nowrap}.hui-change>b{margin-left:auto;color:#d19a66;font-size:10px}.hui-change>b[data-status^=M]{color:#d7ba7d}.hui-change>b[data-status^=A],.hui-change>b[data-status^=?]{color:#73c991}.hui-change>b[data-status^=D]{color:#f48771}.hui-tree>p,.hui-empty-small{padding:12px 16px;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;line-height:1.5}
.hui-editor{display:flex;min-width:0;min-height:0;flex-direction:column;background:var(--dsw-alias-bg-module-platform,#fff)}.hui-editor-tabs{height:35px;flex:none;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f3f3f3)}.hui-editor-tab{display:flex;width:min(190px,80%);height:35px;align-items:center;gap:5px;padding:0 10px;border-top:1px solid #007acc;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#fff);font-size:11px}.hui-editor-tab>span:nth-child(2){overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-editor-tab>i{color:var(--dsw-alias-label-tertiary,#858585);font-size:13px;font-style:normal}.hui-breadcrumbs{display:flex;height:26px;align-items:center;gap:3px;padding:0 10px;overflow:hidden;border-bottom:1px solid var(--dsw-alias-border-l2,#eee);color:var(--dsw-alias-label-secondary,#666);font-size:10px;white-space:nowrap}.hui-breadcrumbs span{display:flex;align-items:center;gap:3px}.hui-breadcrumbs svg{flex:none;color:var(--dsw-alias-label-tertiary,#999)}.hui-preview{flex:1;padding:16px 18px;background:var(--dsw-alias-bg-module-platform,#fff);color:var(--dsw-alias-label-primary,#1e1e1e);font:12px/1.65 "SFMono-Regular",Consolas,"Liberation Mono",monospace;tab-size:2}.hui-statusbar{display:flex;height:22px;flex:none;align-items:center;justify-content:space-between;padding:0 9px;background:#007acc;color:#fff;font-size:10px}.hui-error{position:absolute;z-index:2;top:35px;right:0;left:46px;margin:0;padding:7px 10px;background:#b42318;color:#fff;font-size:11px}
.hui-change>b[data-status="??"]{color:#73c991}@media(min-width:1100px){div:has(>[data-shell-overlay]):has(.hui-drawer){box-sizing:border-box;padding-right:var(--hui-drawer-width,clamp(600px,46vw,780px))}}@media(max-width:1099px){.hui-drawer{width:min(100vw,780px)}}@media(max-width:650px){.hui-workbench{grid-template-columns:42px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:42px 210px minmax(280px,1fr)}.hui-drawer{overflow:auto}.hui-workbench{min-width:620px}}
`;
const FLAT_STYLES = `
.hui-drawer{border-left:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff);box-shadow:none}.hui-titlebar{height:40px;padding:0 12px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-vscode-mark{width:22px;height:22px;border-radius:4px;background:transparent;color:var(--dsw-alias-brand-primary,#4d6bfe);font-size:14px}.hui-titlebar span:last-child{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-titlebar button,.hui-explorer>header button{border-radius:5px;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}
.hui-workbench{grid-template-columns:44px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:44px 238px minmax(0,1fr)}.hui-activity{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-activity button{height:46px;border-left-width:2px;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-activity button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-activity button[data-active]{border-left-color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-activity button>b{background:var(--dsw-alias-brand-primary,#4d6bfe)}
.hui-explorer{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-explorer>header{height:40px}.hui-section-title{height:26px;background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-section-title>em{background:var(--dsw-alias-fill-secondary,#aab1bf);color:var(--dsw-alias-bg-base,#fff)}.hui-tree-row{height:26px}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tree-row[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);box-shadow:inset 2px 0 0 var(--dsw-alias-brand-primary,#4d6bfe);outline:0}.hui-chevron{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-folder,.hui-file{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b[data-status^=M]{color:var(--dsw-alias-label-warning,#b7791f)}.hui-change>b[data-status^=A],.hui-change>b[data-status="??"]{color:var(--dsw-alias-label-success,#16895a)}.hui-change>b[data-status^=D]{color:var(--dsw-alias-label-error,#d94a4a)}
.hui-editor{background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tabs{height:36px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-editor-tab{height:36px;border-top:0;border-right-color:var(--dsw-alias-border-l2,#e4e8f0);box-shadow:inset 0 2px 0 var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tab>span:first-child{overflow:hidden;min-width:0;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-breadcrumbs{height:28px;border-color:var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-preview{background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033)}.hui-statusbar{height:24px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-statusbar span{display:inline-flex;align-items:center;gap:4px}
`;
const EDITOR_STYLES = `
.hui-editor-tab>button{display:grid;width:20px;height:20px;padding:0;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary,#8a93a5);font:14px/1 sans-serif;cursor:pointer}.hui-editor-tab>button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-breadcrumbs{justify-content:space-between}.hui-breadcrumbs>div{display:flex;min-width:0;overflow:hidden}.hui-breadcrumbs>b{flex:none;margin-left:8px;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9px;font-weight:600;letter-spacing:.4px}.hui-editor-surface{min-width:0;min-height:0;flex:1;overflow:auto;background:var(--dsw-alias-bg-base,#fff)}
.hui-code-view{display:table;width:100%;min-width:max-content;padding:10px 0;font:12px/1.65 "SFMono-Regular",Consolas,"Liberation Mono",monospace;counter-reset:line}.hui-code-line{display:table-row;min-height:20px}.hui-code-line>span{display:table-cell;width:1%;padding:0 12px 0 10px;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-tertiary,#8a93a5);text-align:right;user-select:none}.hui-code-line>code{display:table-cell;padding:0 16px;white-space:pre}.hui-code-line:hover>code{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-code-line[data-change=add]>code{background:var(--dsw-alias-bg-success-subtle,#eaf7f0);color:var(--dsw-alias-label-success,#16895a)}.hui-code-line[data-change=delete]>code{background:var(--dsw-alias-bg-error-subtle,#fceeee);color:var(--dsw-alias-label-error,#d94a4a)}.hui-code-line[data-change=hunk]>code{background:var(--dsw-alias-bg-info-subtle,#eef2ff);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.hui-markdown-view{max-width:720px;margin:0 auto;padding:28px 30px;color:var(--dsw-alias-label-primary,#172033);font-size:13px;line-height:1.7}.hui-markdown-view p{margin:4px 0}.hui-md-heading{margin:20px 0 8px;padding-bottom:6px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);font-weight:650}.hui-md-heading[data-level="1"]{font-size:24px}.hui-md-heading[data-level="2"]{font-size:20px}.hui-md-heading[data-level="3"]{font-size:16px}.hui-md-heading[data-level="4"]{font-size:14px}.hui-md-list{display:flex;gap:9px;padding-left:8px}.hui-md-list>span{color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-markdown-view blockquote{margin:10px 0;padding:5px 12px;border-left:3px solid var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-md-fence{margin-top:8px;padding:5px 9px;background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-tertiary,#8a93a5);font:10px/1.4 monospace}.hui-md-space{height:8px}
.hui-image-view,.hui-binary-view{display:flex;min-height:100%;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:24px;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-image-view{background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-image-view img{display:block;max-width:100%;max-height:calc(100vh - 180px);object-fit:contain}.hui-image-view span,.hui-binary-view span{font-size:11px}.hui-binary-view strong{color:var(--dsw-alias-label-secondary,#6c768a);font-size:13px}.hui-text-view{min-height:100%;padding:24px 28px;color:var(--dsw-alias-label-primary,#172033);font:13px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;white-space:pre-wrap;word-break:break-word}
.hui-code-line>code .hljs-comment{color:#6a737d;font-style:italic}.hui-code-line>code .hljs-keyword,.hui-code-line>code .hljs-selector-tag,.hui-code-line>code .hljs-literal,.hui-code-line>code .hljs-doctag{color:#d73a49}.hui-code-line>code .hljs-string,.hui-code-line>code .hljs-regexp,.hui-code-line>code .hljs-template-string{color:#032f62}.hui-code-line>code .hljs-attr{color:#e36209}.hui-code-line>code .hljs-number,.hui-code-line>code .hljs-title,.hui-code-line>code .hljs-function .hljs-title,.hui-code-line>code .hljs-symbol{color:#005cc5}.hui-code-line>code .hljs-built_in,.hui-code-line>code .hljs-type,.hui-code-line>code .hljs-class .hljs-title,.hui-code-line>code .hljs-title.class_{color:#e36209}.hui-code-line>code .hljs-variable,.hui-code-line>code .hljs-template-variable,.hui-code-line>code .hljs-name,.hui-code-line>code .hljs-tag,.hui-code-line>code .hljs-attribute{color:#22863a}.hui-code-line>code .hljs-params,.hui-code-line>code .hljs-property{color:#005cc5}.hui-code-line>code .hljs-emphasis{font-style:italic}.hui-code-line>code .hljs-strong{font-weight:700}
`;
const inject = ["slots", "sessions"];
function apply(ctx) {
	ctx.effect(() => {
		if (document.getElementById(STYLE_ID)) return;
		const style = document.createElement("style");
		style.id = STYLE_ID;
		style.textContent = STYLES + STATUS_STYLES + FLAT_STYLES + EDITOR_STYLES;
		document.head.append(style);
		return () => style.remove();
	}, "dsh-workspace: styles");
	const Summary = ({ wide }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HarnessSummary, {
		wide,
		sessions: ctx.sessions
	});
	ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
		name: "sidebar.footer.action",
		id: "dsh-workspace",
		order: 10
	}, Summary));
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });