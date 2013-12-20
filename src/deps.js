// This file was autogenerated by D:\Work\rflectevents\src\closure-library\closure\bin\build\depswriter.py.
// Please do not edit.
goog.addDependency('../../../rflect/array/array.js', ['rflect.array'], ['goog.array']);
goog.addDependency('../../../rflect/browser/pagevisibility.js', ['rflect.browser.pagevisibility'], []);
goog.addDependency('../../../rflect/browser/transitionend.js', ['rflect.browser.transitionend'], []);
goog.addDependency('../../../rflect/cal/blocks/block.js', ['rflect.cal.blocks', 'rflect.cal.blocks.Block'], ['rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/blocks/blockmanager.js', ['rflect.cal.blocks.BlockManager'], ['rflect.cal.blocks.Block', 'rflect.cal.blocks.BlockPool', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/blocks/blockpool.js', ['rflect.cal.blocks.BlockPool'], ['rflect.cal.blocks.Block', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/containersizemonitor.js', ['rflect.cal.ContainerSizeMonitor'], ['goog.dom', 'goog.style', 'rflect.cal.predefined', 'rflect.dom.ViewportSizeMonitor']);
goog.addDependency('../../../rflect/cal/events/calendar.js', ['rflect.cal.events.Calendar'], ['goog.array', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES']);
goog.addDependency('../../../rflect/cal/events/chip.js', ['rflect.cal.events.Chip'], []);
goog.addDependency('../../../rflect/cal/events/colorcode.js', ['rflect.cal.events.ColorCode'], ['goog.array', 'rflect.cal.i18n.Symbols']);
goog.addDependency('../../../rflect/cal/events/event.js', ['rflect.cal.events.Event'], ['goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimePatterns', 'goog.i18n.DateTimeSymbols', 'rflect.date']);
goog.addDependency('../../../rflect/cal/events/eventholder.js', ['rflect.cal.events.EventHolder'], ['rflect.cal.events.Event', 'rflect.cal.i18n.Symbols', 'rflect.date.DateShim']);
goog.addDependency('../../../rflect/cal/events/eventmanager.js', ['rflect.cal.events.EventManager'], ['goog.date.DateTime', 'rflect.cal.events.Calendar', 'rflect.cal.events.Chip', 'rflect.cal.events.Event', 'rflect.cal.events.EventHolder', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES', 'rflect.cal.predefined.chips', 'rflect.object', 'rflect.structs.IntervalTree']);
goog.addDependency('../../../rflect/cal/events/plan.js', ['rflect.cal.events.Plan'], []);
goog.addDependency('../../../rflect/cal/eventtype.js', ['rflect.cal.EventType'], []);
goog.addDependency('../../../rflect/cal/i18n/colorcodes.js', ['rflect.cal.i18n.PREDEFINED_COLOR_CODES', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES_BY', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES_EN', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES_RU'], ['rflect.cal.events.ColorCode']);
goog.addDependency('../../../rflect/cal/i18n/settingssymbols.js', ['rflect.cal.i18n.SettingsSymbols', 'rflect.cal.i18n.SettingsSymbols_by', 'rflect.cal.i18n.SettingsSymbols_en', 'rflect.cal.i18n.SettingsSymbols_en_US', 'rflect.cal.i18n.SettingsSymbols_fr', 'rflect.cal.i18n.SettingsSymbols_ru'], []);
goog.addDependency('../../../rflect/cal/i18n/symbols.js', ['rflect.cal.i18n.Symbols', 'rflect.cal.i18n.Symbols_by', 'rflect.cal.i18n.Symbols_en', 'rflect.cal.i18n.Symbols_en_US', 'rflect.cal.i18n.Symbols_fr', 'rflect.cal.i18n.Symbols_ru'], []);
goog.addDependency('../../../rflect/cal/loader.js', ['rflect.cal.Loader'], ['goog.events', 'rflect.Debug', 'rflect.cal.Main']);
goog.addDependency('../../../rflect/cal/main.js', ['rflect.cal.Main'], ['goog.Disposable', 'rflect.cal.ViewManager']);
goog.addDependency('../../../rflect/cal/predefined.js', ['rflect.cal.predefined', 'rflect.cal.predefined.chips'], ['goog.math.Size']);
goog.addDependency('../../../rflect/cal/timemanager.js', ['rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction'], ['goog.array', 'goog.date', 'goog.date.Date', 'goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'rflect.cal.ViewType', 'rflect.date', 'rflect.date.DateShim', 'rflect.date.Interval', 'rflect.math']);
goog.addDependency('../../../rflect/cal/transport.js', ['rflect.cal.Transport', 'rflect.cal.Transport.EventTypes'], ['goog.net.XhrIo', 'goog.testing.net.XhrIo', 'rflect.cal.events.Calendar', 'rflect.cal.events.Event', 'rflect.cal.events.EventManager', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES', 'rflect.date.Interval']);
goog.addDependency('../../../rflect/cal/ui/ac/ac.js', ['rflect.cal.ui.ac'], ['rflect.cal.ui.ac.NoFilterMatcher', 'rflect.cal.ui.ac.RendererScrollSupport', 'rflect.cal.ui.ac.TimeAutoComplete', 'rflect.ui.ac.InputHandler']);
goog.addDependency('../../../rflect/cal/ui/ac/nofiltermatcher.js', ['rflect.cal.ui.ac.NoFilterMatcher'], ['goog.array', 'rflect.ui.ac.ArrayMatcher']);
goog.addDependency('../../../rflect/cal/ui/ac/rendererscrollsupport.js', ['rflect.cal.ui.ac.RendererScrollSupport'], ['rflect.ui.ac.Renderer']);
goog.addDependency('../../../rflect/cal/ui/ac/timeautocomplete.js', ['rflect.cal.ui.ac.TimeAutoComplete'], ['rflect.ui.ac.AutoComplete']);
goog.addDependency('../../../rflect/cal/ui/calendarsselect.js', ['rflect.cal.ui.CalendarsSelect'], ['goog.Disposable', 'goog.array', 'goog.dom']);
goog.addDependency('../../../rflect/cal/ui/calselector.js', ['rflect.cal.ui.CalSelector', 'rflect.cal.ui.CalSelector.EventType'], ['goog.dom.classes', 'goog.ui.Component.EventType', 'rflect.cal.i18n.Symbols', 'rflect.cal.predefined', 'rflect.cal.ui.ListSelector', 'rflect.string', 'rflect.ui.Checkbox']);
goog.addDependency('../../../rflect/cal/ui/controlpane.js', ['rflect.cal.ui.ControlPane'], ['goog.array', 'goog.events.EventType', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimePatterns', 'goog.ui.Button', 'goog.ui.Component.EventType', 'goog.ui.Component.State', 'goog.ui.FlatButtonRenderer', 'goog.ui.ToggleButton', 'rflect.cal.EventType', 'rflect.cal.i18n.Symbols', 'rflect.cal.predefined', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/ui/datepicker.js', ['rflect.cal.ui.DatePicker'], ['goog.array', 'goog.events.Event', 'goog.events.EventType', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.cal.ui.MiniCalBuilder', 'rflect.date', 'rflect.string', 'rflect.ui.Component', 'rflect.ui.MouseOverRegistry']);
goog.addDependency('../../../rflect/cal/ui/editdialog.js', ['rflect.cal.ui.EditDialog', 'rflect.cal.ui.EditDialog.ButtonCaptions'], ['goog.events.KeyCodes', 'goog.ui.Component.EventType', 'rflect.cal.i18n.Symbols', 'rflect.cal.ui.SaveDialog', 'rflect.ui.DialogMouseMissBehavior']);
goog.addDependency('../../../rflect/cal/ui/eventpane.js', ['rflect.cal.ui.EventPane', 'rflect.cal.ui.EventPane.EventTypes'], ['goog.dom.classes', 'goog.events.Event', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.i18n.DateTimeParse', 'goog.i18n.DateTimeSymbols', 'goog.style', 'goog.ui.Button', 'goog.ui.Component', 'goog.ui.FlatButtonRenderer', 'goog.ui.ac', 'rflect.cal.i18n.Symbols', 'rflect.cal.ui.CalendarsSelect', 'rflect.cal.ui.EditDialog.ButtonCaptions', 'rflect.cal.ui.InputDatePicker', 'rflect.cal.ui.PaneShowBehavior', 'rflect.cal.ui.PaneShowBehavior.EventTypes', 'rflect.cal.ui.ac', 'rflect.date.util', 'rflect.dom', 'rflect.ui.Checkbox', 'rflect.ui.Dialog.DefaultButtonCaptions']);
goog.addDependency('../../../rflect/cal/ui/inputdatepicker.js', ['rflect.cal.ui.InputDatePicker'], ['goog.events.KeyCodes', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeParse', 'goog.string', 'goog.style', 'rflect.cal.ui.DatePicker', 'rflect.ui.MouseMissBehavior']);
goog.addDependency('../../../rflect/cal/ui/listselector.js', ['rflect.cal.ui.ListSelector'], ['goog.dom', 'goog.events', 'goog.events.EventType', 'rflect.cal.predefined', 'rflect.string', 'rflect.ui.Component', 'rflect.ui.MouseOverRegistry']);
goog.addDependency('../../../rflect/cal/ui/mainbody.js', ['rflect.cal.ui.MainBody'], ['goog.math.Size', 'goog.style', 'rflect.cal.Transport', 'rflect.cal.predefined', 'rflect.cal.ui.CalSelector', 'rflect.cal.ui.CalSelector.EventType', 'rflect.cal.ui.ControlPane', 'rflect.cal.ui.EventPane', 'rflect.cal.ui.EventPane.EventTypes', 'rflect.cal.ui.MainPane', 'rflect.cal.ui.MiniCal', 'rflect.cal.ui.PaneShowBehavior.EventTypes', 'rflect.cal.ui.PaneShowBehavior.SlideBreakPointEvent', 'rflect.cal.ui.SettingsPane', 'rflect.cal.ui.SettingsPane.EventTypes', 'rflect.cal.ui.SidePane', 'rflect.cal.ui.TaskSelector', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/ui/mainpane.js', ['rflect.cal.ui.MainPane'], ['goog.array', 'goog.events', 'goog.events.EventType', 'goog.math.Size', 'goog.string', 'goog.userAgent', 'rflect.cal.Transport.EventTypes', 'rflect.cal.predefined', 'rflect.cal.predefined.chips', 'rflect.cal.ui.EditDialog', 'rflect.cal.ui.MainPaneBuilder', 'rflect.cal.ui.MainPaneSelectionMask', 'rflect.cal.ui.SaveDialog', 'rflect.cal.ui.TimeMarker', 'rflect.string', 'rflect.ui.Component', 'rflect.ui.MouseOverRegistry']);
goog.addDependency('../../../rflect/cal/ui/mainpanebuilder.js', ['rflect.cal.ui.MainPaneBuilder'], ['goog.date.DateTime', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'goog.string.StringBuffer', 'rflect.cal.i18n.Symbols', 'rflect.date', 'rflect.date.util']);
goog.addDependency('../../../rflect/cal/ui/mainpaneselectionmask.js', ['rflect.cal.ui.MainPaneSelectionMask'], ['goog.date.DateTime', 'goog.dom', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'goog.style', 'rflect.cal.predefined', 'rflect.cal.ui.SelectionMask']);
goog.addDependency('../../../rflect/cal/ui/minical.js', ['rflect.cal.ui.MiniCal'], ['goog.array', 'goog.events.EventType', 'rflect.cal.EventType', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.cal.ui.DatePicker', 'rflect.cal.ui.MiniCalSelectionMask', 'rflect.string']);
goog.addDependency('../../../rflect/cal/ui/minicalbuilder.js', ['rflect.cal.ui.MiniCalBuilder'], ['goog.i18n.DateTimeSymbols']);
goog.addDependency('../../../rflect/cal/ui/minicalselectionmask.js', ['rflect.cal.ui.MiniCalSelectionMask'], ['goog.dom', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'goog.style', 'rflect.cal.predefined', 'rflect.cal.ui.SelectionMask']);
goog.addDependency('../../../rflect/cal/ui/paneshowbehavior.js', ['rflect.cal.ui.PaneShowBehavior', 'rflect.cal.ui.PaneShowBehavior.EventTypes', 'rflect.cal.ui.PaneShowBehavior.SlideBreakPointEvent'], ['goog.dom.classes', 'goog.events', 'goog.events.Event', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.style', 'rflect.browser.transitionend']);
goog.addDependency('../../../rflect/cal/ui/savedialog.js', ['rflect.cal.ui.SaveDialog'], ['goog.dom', 'rflect.cal.i18n.Symbols', 'rflect.cal.ui.CalendarsSelect', 'rflect.ui.DialogMouseMissBehavior']);
goog.addDependency('../../../rflect/cal/ui/selectionmask.js', ['rflect.cal.ui.SelectionMask'], ['goog.functions', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/ui/settingspane.js', ['rflect.cal.ui.SettingsPane', 'rflect.cal.ui.SettingsPane.EventTypes'], ['goog.array', 'goog.dom.classes', 'goog.events.Event', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.i18n.DateTimeParse', 'goog.i18n.DateTimeSymbols', 'goog.object', 'goog.style', 'goog.ui.Button', 'goog.ui.Component', 'goog.ui.FlatButtonRenderer', 'goog.ui.Tab', 'goog.ui.TabBar', 'rflect.cal.Transport', 'rflect.cal.Transport.EventTypes', 'rflect.cal.i18n.PREDEFINED_COLOR_CODES', 'rflect.cal.i18n.SettingsSymbols', 'rflect.cal.i18n.Symbols', 'rflect.cal.ui.EditDialog.ButtonCaptions', 'rflect.cal.ui.PaneShowBehavior', 'rflect.cal.ui.PaneShowBehavior.EventTypes', 'rflect.string', 'rflect.ui.Checkbox', 'rflect.ui.Dialog.DefaultButtonCaptions']);
goog.addDependency('../../../rflect/cal/ui/sidepane.js', ['rflect.cal.ui.SidePane'], ['goog.array', 'goog.events.EventType', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimePatterns', 'goog.ui.Button', 'goog.ui.Component.EventType', 'goog.ui.Component.State', 'goog.ui.FlatButtonRenderer', 'goog.ui.ToggleButton', 'rflect.cal.EventType', 'rflect.cal.i18n.Symbols', 'rflect.cal.predefined', 'rflect.cal.ui.PaneShowBehavior', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/ui/taskselector.js', ['rflect.cal.ui.TaskSelector'], ['rflect.cal.i18n.Symbols', 'rflect.cal.ui.ListSelector']);
goog.addDependency('../../../rflect/cal/ui/timemarker.js', ['rflect.cal.ui.TimeMarker'], ['goog.Disposable', 'goog.date.Date', 'goog.date.DateTime', 'goog.dom', 'goog.events', 'rflect.browser.pagevisibility', 'rflect.date']);
goog.addDependency('../../../rflect/cal/viewmanager.js', ['rflect.cal.ViewManager'], ['goog.dom', 'goog.events.EventHandler', 'goog.events.EventType', 'rflect.cal.ContainerSizeMonitor', 'rflect.cal.EventType', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.cal.Transport', 'rflect.cal.ViewType', 'rflect.cal.blocks.BlockManager', 'rflect.cal.events.EventManager', 'rflect.cal.predefined', 'rflect.cal.ui.MainBody']);
goog.addDependency('../../../rflect/cal/viewtype.js', ['rflect.cal.ViewType'], []);
goog.addDependency('../../../rflect/date/date.js', ['rflect.date', 'rflect.date.DateShim'], ['goog.date.Date', 'goog.date.DateTime', 'goog.date.Interval', 'goog.i18n.DateTimeSymbols']);
goog.addDependency('../../../rflect/date/interval.js', ['rflect.date.Interval'], ['goog.date.Date']);
goog.addDependency('../../../rflect/date/util.js', ['rflect.date.util'], ['goog.date.DateTime', 'goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/debug/debug.js', ['rflect.Debug'], ['goog.debug.FancyWindow', 'goog.debug.Logger', 'goog.userAgent']);
goog.addDependency('../../../rflect/dom/dom.js', ['rflect.dom'], ['goog.dom']);
goog.addDependency('../../../rflect/dom/viewportsizemonitor.js', ['rflect.dom.ViewportSizeMonitor'], ['goog.dom', 'goog.events', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.math.Size', 'goog.userAgent']);
goog.addDependency('../../../rflect/math/math.js', ['rflect.math'], []);
goog.addDependency('../../../rflect/object/object.js', ['rflect.object'], []);
goog.addDependency('../../../rflect/string/string.js', ['rflect.string'], ['goog.string']);
goog.addDependency('../../../rflect/structs/intervaltree.js', ['rflect.structs.IntervalTree'], ['goog.array', 'rflect.array', 'rflect.date.Interval']);
goog.addDependency('../../../rflect/ui/ac/ac.js', ['rflect.ui.ac'], ['rflect.ui.ac.ArrayMatcher', 'rflect.ui.ac.AutoComplete', 'rflect.ui.ac.InputHandler', 'rflect.ui.ac.Renderer']);
goog.addDependency('../../../rflect/ui/ac/arraymatcher.js', ['rflect.ui.ac.ArrayMatcher'], ['goog.iter', 'goog.string']);
goog.addDependency('../../../rflect/ui/ac/autocomplete.js', ['rflect.ui.ac.AutoComplete', 'rflect.ui.ac.AutoComplete.EventType'], ['goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../rflect/ui/ac/inputhandler.js', ['rflect.ui.ac.InputHandler'], ['goog.Disposable', 'goog.Timer', 'goog.a11y.aria', 'goog.asserts', 'goog.dom', 'goog.dom.selection', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.events.KeyHandler', 'goog.events.KeyHandler.EventType', 'goog.string', 'goog.userAgent', 'goog.userAgent.product']);
goog.addDependency('../../../rflect/ui/ac/remote.js', ['rflect.ui.ac.Remote'], ['rflect.ui.ac.AutoComplete', 'rflect.ui.ac.InputHandler', 'rflect.ui.ac.RemoteArrayMatcher', 'rflect.ui.ac.Renderer']);
goog.addDependency('../../../rflect/ui/ac/remotearraymatcher.js', ['rflect.ui.ac.RemoteArrayMatcher'], ['goog.Disposable', 'goog.Uri', 'goog.events', 'goog.json', 'goog.net.XhrIo']);
goog.addDependency('../../../rflect/ui/ac/renderer.js', ['rflect.ui.ac.Renderer', 'rflect.ui.ac.Renderer.CustomRenderer'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.dispose', 'goog.dom', 'goog.dom.classes', 'goog.events.Event', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.fx.dom.FadeInAndShow', 'goog.fx.dom.FadeOutAndHide', 'goog.iter', 'goog.positioning', 'goog.positioning.Corner', 'goog.positioning.Overflow', 'goog.string', 'goog.style', 'goog.ui.IdGenerator', 'goog.userAgent', 'rflect.ui.ac.AutoComplete.EventType']);
goog.addDependency('../../../rflect/ui/ac/renderoptions.js', ['rflect.ui.ac.RenderOptions'], []);
goog.addDependency('../../../rflect/ui/ac/richinputhandler.js', ['rflect.ui.ac.RichInputHandler'], ['rflect.ui.ac.InputHandler']);
goog.addDependency('../../../rflect/ui/ac/richremote.js', ['rflect.ui.ac.RichRemote'], ['rflect.ui.ac.AutoComplete', 'rflect.ui.ac.Remote', 'rflect.ui.ac.Renderer', 'rflect.ui.ac.RichInputHandler', 'rflect.ui.ac.RichRemoteArrayMatcher']);
goog.addDependency('../../../rflect/ui/ac/richremotearraymatcher.js', ['rflect.ui.ac.RichRemoteArrayMatcher'], ['rflect.ui.ac.RemoteArrayMatcher']);
goog.addDependency('../../../rflect/ui/checkbox.js', ['rflect.ui.Checkbox'], ['goog.ui.Checkbox', 'rflect.ui.CheckboxRenderer']);
goog.addDependency('../../../rflect/ui/checkboxrenderer.js', ['rflect.ui.CheckboxRenderer'], ['goog.style', 'goog.ui.CheckboxRenderer']);
goog.addDependency('../../../rflect/ui/component.js', ['rflect.ui.Component'], ['goog.array', 'goog.string.StringBuffer', 'goog.ui.Component']);
goog.addDependency('../../../rflect/ui/dialog.js', ['rflect.ui.Dialog', 'rflect.ui.Dialog.ButtonSet', 'rflect.ui.Dialog.DefaultButtonCaptions', 'rflect.ui.Dialog.DefaultButtonKeys', 'rflect.ui.Dialog.Event', 'rflect.ui.Dialog.EventType'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.asserts', 'goog.dom', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.classes', 'goog.events', 'goog.events.Event', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.fx.Dragger', 'goog.math.Rect', 'goog.structs', 'goog.structs.Map', 'goog.style', 'goog.ui.ModalPopup', 'goog.userAgent']);
goog.addDependency('../../../rflect/ui/dialogmousemissbehavior.js', ['rflect.ui.DialogMouseMissBehavior'], ['rflect.ui.Dialog', 'rflect.ui.MouseMissBehavior']);
goog.addDependency('../../../rflect/ui/mousemissbehavior.js', ['rflect.ui.MouseMissBehavior'], ['goog.events', 'goog.events.EventType']);
goog.addDependency('../../../rflect/ui/mouseoverregistry.js', ['rflect.ui.MouseOverRegistry'], []);
