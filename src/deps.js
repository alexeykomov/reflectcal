// This file was autogenerated by C:\Work\rflectevents\src\closure-library\closure\bin\build\depswriter.py.
// Please do not edit.
goog.addDependency('../../../rflect/array/array.js', ['rflect.array'], ['goog.array']);
goog.addDependency('../../../rflect/cal/blocks/block.js', ['rflect.cal.blocks', 'rflect.cal.blocks.Block'], ['rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/blocks/blockmanager.js', ['rflect.cal.blocks.BlockManager'], ['rflect.cal.blocks.Block', 'rflect.cal.blocks.BlockPool', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/blocks/blockpool.js', ['rflect.cal.blocks.BlockPool'], ['rflect.cal.blocks.Block', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/button.js', ['rflect.cal.Button'], ['goog.ui.Button']);
goog.addDependency('../../../rflect/cal/calselector.js', ['rflect.cal.CalSelector'], ['rflect.cal.ListSelector', 'rflect.cal.i18n.Symbols']);
goog.addDependency('../../../rflect/cal/containersizemonitor.js', ['rflect.cal.ContainerSizeMonitor'], ['goog.dom.ViewportSizeMonitor', 'goog.style', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/events/chip.js', ['rflect.cal.events.Chip'], []);
goog.addDependency('../../../rflect/cal/events/event.js', ['rflect.cal.events.Event'], ['goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimePatterns', 'goog.i18n.DateTimeSymbols']);
goog.addDependency('../../../rflect/cal/events/eventholder.js', ['rflect.cal.events.EventHolder'], ['rflect.cal.i18n.Symbols', 'rflect.date.DateShim']);
goog.addDependency('../../../rflect/cal/events/eventmanager.js', ['rflect.cal.events.EventManager'], ['goog.date.DateTime', 'rflect.cal.events.Chip', 'rflect.cal.events.Event', 'rflect.cal.events.EventHolder', 'rflect.cal.predefined.chips', 'rflect.object', 'rflect.structs.IntervalTree']);
goog.addDependency('../../../rflect/cal/events/recurringevent.js', ['rflect.cal.events.RecurringEvent'], []);
goog.addDependency('../../../rflect/cal/eventtype.js', ['rflect.cal.EventType'], []);
goog.addDependency('../../../rflect/cal/i18n/predefined.js', ['rflect.cal.i18n.predefined', 'rflect.cal.i18n.predefined_by', 'rflect.cal.i18n.predefined_en', 'rflect.cal.i18n.predefined_ru'], []);
goog.addDependency('../../../rflect/cal/i18n/symbols.js', ['rflect.cal.i18n.Symbols', 'rflect.cal.i18n.Symbols_by', 'rflect.cal.i18n.Symbols_en', 'rflect.cal.i18n.Symbols_en_US', 'rflect.cal.i18n.Symbols_fr', 'rflect.cal.i18n.Symbols_ru'], []);
goog.addDependency('../../../rflect/cal/listselector.js', ['rflect.cal.ListSelector'], ['goog.events', 'goog.events.EventType', 'rflect.cal.MouseOverRegistry', 'rflect.cal.predefined', 'rflect.string', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/loader.js', ['rflect.cal.Loader'], ['goog.events', 'rflect.Debug', 'rflect.cal.Main']);
goog.addDependency('../../../rflect/cal/main.js', ['rflect.cal.Main'], ['goog.Disposable', 'rflect.cal.ViewManager']);
goog.addDependency('../../../rflect/cal/mainbody.js', ['rflect.cal.MainBody'], ['goog.math.Size', 'goog.style', 'rflect.cal.CalSelector', 'rflect.cal.MainPane', 'rflect.cal.MiniCal', 'rflect.cal.TaskSelector', 'rflect.cal.TopPane', 'rflect.cal.predefined', 'rflect.cal.ui.EventPane', 'rflect.cal.ui.EventPane.EventTypes', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/mainpane.js', ['rflect.cal.MainPane'], ['goog.array', 'goog.events', 'goog.events.EventType', 'goog.math.Size', 'rflect.cal.MainPaneBuilder', 'rflect.cal.MainPaneSelectionMask', 'rflect.cal.MouseOverRegistry', 'rflect.cal.TimeMarker', 'rflect.cal.predefined', 'rflect.cal.predefined.chips', 'rflect.cal.ui.EditDialog', 'rflect.cal.ui.SaveDialog', 'rflect.string', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/mainpanebuilder.js', ['rflect.cal.MainPaneBuilder'], ['goog.date.DateTime', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'goog.string.StringBuffer', 'rflect.cal.i18n.Symbols', 'rflect.cal.i18n.predefined', 'rflect.date', 'rflect.date.util']);
goog.addDependency('../../../rflect/cal/mainpaneselectionmask.js', ['rflect.cal.MainPaneSelectionMask'], ['goog.date.DateTime', 'goog.dom', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'goog.style', 'rflect.cal.SelectionMask', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/minical.js', ['rflect.cal.MiniCal'], ['goog.array', 'goog.events.EventType', 'rflect.cal.EventType', 'rflect.cal.MiniCalSelectionMask', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.cal.ui.DatePicker', 'rflect.string']);
goog.addDependency('../../../rflect/cal/minicalbuilder.js', ['rflect.cal.MiniCalBuilder'], ['goog.i18n.DateTimeSymbols', 'rflect.cal.i18n.predefined']);
goog.addDependency('../../../rflect/cal/minicalselectionmask.js', ['rflect.cal.MiniCalSelectionMask'], ['goog.dom', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'goog.style', 'rflect.cal.SelectionMask', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/mouseoverregistry.js', ['rflect.cal.MouseOverRegistry'], []);
goog.addDependency('../../../rflect/cal/predefined.js', ['rflect.cal.predefined', 'rflect.cal.predefined.chips'], ['goog.math.Size', 'rflect.cal.i18n.predefined']);
goog.addDependency('../../../rflect/cal/selectionmask.js', ['rflect.cal.SelectionMask'], ['goog.functions', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.string.StringBuffer', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/taskselector.js', ['rflect.cal.TaskSelector'], ['rflect.cal.ListSelector', 'rflect.cal.i18n.Symbols']);
goog.addDependency('../../../rflect/cal/timemanager.js', ['rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction'], ['goog.array', 'goog.date', 'goog.date.Date', 'goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'rflect.cal.ViewType', 'rflect.date', 'rflect.date.DateShim', 'rflect.date.Interval', 'rflect.math']);
goog.addDependency('../../../rflect/cal/timemarker.js', ['rflect.cal.TimeMarker'], ['goog.Disposable', 'goog.dom', 'goog.events', 'rflect.date', 'rflect.pagevis']);
goog.addDependency('../../../rflect/cal/toppane.js', ['rflect.cal.TopPane'], ['goog.array', 'goog.events.EventType', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimePatterns', 'goog.ui.Button', 'goog.ui.Component.EventType', 'goog.ui.Component.State', 'goog.ui.FlatButtonRenderer', 'goog.ui.ToggleButton', 'rflect.cal.EventType', 'rflect.cal.i18n.Symbols', 'rflect.cal.predefined', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/ui/ac/ac.js', ['rflect.cal.ui.ac'], ['goog.ui.ac.InputHandler', 'rflect.cal.ui.ac.NoFilterMatcher', 'rflect.cal.ui.ac.RendererScrollSupport', 'rflect.cal.ui.ac.TimeAutoComplete']);
goog.addDependency('../../../rflect/cal/ui/ac/autocomplete.js', ['rflect.cal.ui.ac.TimeAutoComplete'], ['goog.ui.ac.AutoComplete']);
goog.addDependency('../../../rflect/cal/ui/ac/nofiltermatcher.js', ['rflect.cal.ui.ac.NoFilterMatcher'], ['goog.array', 'goog.ui.ac.ArrayMatcher']);
goog.addDependency('../../../rflect/cal/ui/ac/renderer.js', ['rflect.cal.ui.ac.RendererScrollSupport'], ['goog.ui.ac.Renderer']);
goog.addDependency('../../../rflect/cal/ui/datepicker.js', ['rflect.cal.ui.DatePicker'], ['goog.array', 'goog.events.Event', 'goog.events.EventType', 'rflect.cal.MiniCalBuilder', 'rflect.cal.MouseOverRegistry', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.date', 'rflect.string', 'rflect.ui.Component']);
goog.addDependency('../../../rflect/cal/ui/editdialog.js', ['rflect.cal.ui.EditDialog', 'rflect.cal.ui.EditDialog.ButtonCaptions'], ['rflect.cal.i18n.Symbols', 'rflect.cal.ui.SaveDialog', 'rflect.ui.DialogMouseMissBehavior']);
goog.addDependency('../../../rflect/cal/ui/eventpane.js', ['rflect.cal.ui.EventPane', 'rflect.cal.ui.EventPane.EventTypes'], ['goog.dom.classes', 'goog.events.Event', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.i18n.DateTimeParse', 'goog.i18n.DateTimeSymbols', 'goog.style', 'goog.ui.Button', 'goog.ui.Checkbox', 'goog.ui.Component', 'goog.ui.FlatButtonRenderer', 'goog.ui.ac', 'rflect.cal.i18n.Symbols', 'rflect.cal.ui.EditDialog.ButtonCaptions', 'rflect.cal.ui.InputDatePicker', 'rflect.cal.ui.ac', 'rflect.date.util', 'rflect.ui.Dialog.DefaultButtonCaptions']);
goog.addDependency('../../../rflect/cal/ui/inputdatepicker.js', ['rflect.cal.ui.InputDatePicker'], ['goog.events.KeyCodes', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeParse', 'goog.string', 'goog.style', 'rflect.cal.ui.DatePicker', 'rflect.ui.MouseMissBehavior']);
goog.addDependency('../../../rflect/cal/ui/savedialog.js', ['rflect.cal.ui.SaveDialog'], ['rflect.cal.i18n.Symbols', 'rflect.ui.DialogMouseMissBehavior']);
goog.addDependency('../../../rflect/cal/viewmanager.js', ['rflect.cal.ViewManager'], ['goog.dom', 'goog.events.EventHandler', 'goog.events.EventType', 'rflect.cal.ContainerSizeMonitor', 'rflect.cal.EventType', 'rflect.cal.MainBody', 'rflect.cal.TimeManager', 'rflect.cal.TimeManager.Direction', 'rflect.cal.ViewType', 'rflect.cal.blocks.BlockManager', 'rflect.cal.events.EventManager', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/cal/viewtype.js', ['rflect.cal.ViewType'], []);
goog.addDependency('../../../rflect/date/date.js', ['rflect.date', 'rflect.date.DateShim'], ['goog.date.Date', 'goog.date.DateTime', 'goog.date.Interval', 'goog.i18n.DateTimeSymbols']);
goog.addDependency('../../../rflect/date/interval.js', ['rflect.date.Interval'], ['goog.date.Date']);
goog.addDependency('../../../rflect/date/util.js', ['rflect.date.util'], ['goog.date.DateTime', 'goog.date.Interval', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'rflect.cal.predefined']);
goog.addDependency('../../../rflect/debug/debug.js', ['rflect.Debug'], ['goog.debug.FancyWindow', 'goog.debug.Logger', 'goog.userAgent']);
goog.addDependency('../../../rflect/math/math.js', ['rflect.math'], []);
goog.addDependency('../../../rflect/object/object.js', ['rflect.object'], []);
goog.addDependency('../../../rflect/pagevis/pagevisibility.js', ['rflect.pagevis'], []);
goog.addDependency('../../../rflect/string/string.js', ['rflect.string'], ['goog.string']);
goog.addDependency('../../../rflect/structs/intervaltree.js', ['rflect.structs.IntervalTree'], ['goog.array', 'rflect.array', 'rflect.date.Interval']);
goog.addDependency('../../../rflect/ui/component.js', ['rflect.ui.Component'], ['goog.array', 'goog.string.StringBuffer', 'goog.ui.Component']);
goog.addDependency('../../../rflect/ui/dialog.js', ['rflect.ui.Dialog', 'rflect.ui.Dialog.ButtonSet', 'rflect.ui.Dialog.DefaultButtonCaptions', 'rflect.ui.Dialog.DefaultButtonKeys', 'rflect.ui.Dialog.Event', 'rflect.ui.Dialog.EventType'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.asserts', 'goog.dom', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.classes', 'goog.events', 'goog.events.Event', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.fx.Dragger', 'goog.math.Rect', 'goog.structs', 'goog.structs.Map', 'goog.style', 'goog.ui.ModalPopup', 'goog.userAgent']);
goog.addDependency('../../../rflect/ui/dialogmousemissbehavior.js', ['rflect.ui.DialogMouseMissBehavior'], ['rflect.ui.Dialog', 'rflect.ui.MouseMissBehavior']);
goog.addDependency('../../../rflect/ui/mousemissbehavior.js', ['rflect.ui.MouseMissBehavior'], ['goog.events', 'goog.events.EventType']);
