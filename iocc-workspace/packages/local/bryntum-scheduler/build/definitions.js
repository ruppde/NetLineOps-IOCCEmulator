//@define Sch.util.Patch

//@define Sch.patches.LoadMask
//@require Sch.util.Patch
//@require Ext.view.AbstractView

//@define Sch.patches.Table
//@require Sch.util.Patch
//@require Ext.view.Table

//@define Sch.patches.TreeView
//@require Sch.util.Patch
//@require Ext.tree.View

//@define Sch.patches.DataOperation
//@require Sch.util.Patch
//@require Ext.data.Operation

//@define Sch.patches.TreeStore
//@require Sch.util.Patch
//@require Ext.data.TreeStore

//@define Sch.util.Date
//@require Ext.Date

//@define Sch.util.DragTracker
//@require Ext.dd.DragTracker

//@define Sch.util.HeaderRenderers
//@require Sch.util.Date
//@require Ext.XTemplate

//@define Sch.model.Customizable
//@require Ext.data.Model

//@define Sch.patches.Model
//@require Sch.util.Patch
//@require Sch.model.Customizable

//@define Sch.foo
//@require Ext.data.Model

//@define Sch.foo.Sub
//@require Sch.foo

//@define Sch.model.Range
//@require Sch.model.Customizable
//@require Sch.util.Date
//@require Sch.patches.DataOperation

//@define Sch.model.Resource
//@require Sch.model.Customizable

//@define Sch.data.mixin.ResourceStore

//@define Sch.data.ResourceStore
//@require Ext.data.Store

//@define Sch.data.TimeAxis
//@require Ext.util.Observable
//@require Ext.data.JsonStore
//@require Sch.util.Date

//@define Sch.preset.Manager
//@require Ext.util.MixedCollection
//@require Sch.util.Date
//@require Sch.util.HeaderRenderers

//@define Sch.feature.AbstractTimeSpan
//@require Ext.AbstractPlugin

//@define Sch.plugin.Lines
//@require Sch.feature.AbstractTimeSpan

//@define Sch.plugin.Zones
//@require Sch.feature.AbstractTimeSpan
//@require Sch.model.Range

//@define Sch.plugin.Pan
//@require Ext.AbstractPlugin

//@define Sch.view.Locking
//@require Ext.grid.LockingView

//@define Sch.column.Time
//@require Ext.grid.column.Column

//@define Sch.column.timeAxis.Horizontal
//@require Ext.grid.column.Column
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.column.Time
//@require Sch.preset.Manager

//@define Sch.column.timeAxis.HorizontalSingle
//@require Sch.column.Time
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.preset.Manager

//@define Sch.mixin.Lockable
//@require Ext.grid.Lockable
//@require Sch.column.timeAxis.Horizontal
//@require Sch.column.timeAxis.HorizontalSingle

//@define Sch.plugin.TreeCellEditing
//@require Ext.grid.plugin.CellEditing

//@define Sch.feature.ColumnLines
//@require Sch.plugin.Lines
//@require Ext.data.Store

//@define Sch.model.TimeLine
//@require Ext.data.Model

//@define Sch.plugin.CurrentTimeLine
//@require Sch.plugin.Lines

//@define TimeLineEvent
//@require Ext.data.Model

//@define Sch.mixin.TimelineView
//@require Sch.column.Time
//@require Sch.data.TimeAxis

//@define Sch.view.Horizontal

//@define Sch.view.TimelineTreeView
//@require Ext.tree.View
//@require Sch.patches.TreeView

//@define Sch.mixin.Zoomable

//@define Sch.mixin.TimelinePanel
//@require Sch.util.Patch
//@require Sch.patches.LoadMask
//@require Sch.patches.Model
//@require Sch.patches.Table
//@require Sch.data.TimeAxis
//@require Sch.feature.ColumnLines
//@require Sch.view.Locking
//@require Sch.mixin.Lockable
//@require Sch.preset.Manager

//@define Sch.panel.TimelineTreePanel
//@require Ext.tree.Panel
//@require Ext.data.TreeStore

//@define Sch.plugin.Printable
//@require Ext.AbstractPlugin

//@define Sch.plugin.PdfExport
//@require Ext.util.Observable

//@define Sch.widget.ResizePicker
//@require Ext.Panel

//@define Sch.widget.ExportDialogForm
//@require Ext.form.Panel
//@require Sch.widget.ResizePicker

//@define Sch.widget.ExportDialogButtons
//@require Ext.panel.Panel

//@define Sch.widget.PdfExportDialog
//@require Ext.window.Window
//@require Ext.ProgressBar
//@require Sch.widget.ExportDialogForm

//@define Gnt.model.WeekAvailability
//@require Sch.model.Range

//@define Gnt.model.CalendarDay
//@require Ext.data.Types
//@require Sch.model.Customizable

//@define Gnt.model.Assignment
//@require Sch.model.Customizable

//@define Gnt.model.Dependency
//@require Sch.model.Customizable

//@define Gnt.model.Resource
//@require Sch.model.Resource

//@define Gnt.model.task.More

//@define Gnt.model.Task
//@require Sch.model.Range
//@require Sch.util.Date
//@require Ext.data.NodeInterface

//@define Gnt.data.Calendar
//@require Ext.data.Store
//@require Ext.Date
//@require Gnt.model.CalendarDay
//@require Sch.model.Range
//@require Sch.util.Date

//@define Gnt.data.calendar.BusinessTime
//@require Gnt.data.Calendar

//@define Gnt.data.TaskStore
//@require Ext.data.TreeStore
//@require Sch.patches.TreeStore
//@require Gnt.model.Task
//@require Gnt.data.Calendar

//@define Gnt.data.DependencyStore
//@require Ext.data.Store

//@define Gnt.data.ResourceStore
//@require Gnt.model.Resource
//@require Sch.data.ResourceStore

//@define Gnt.data.AssignmentStore
//@require Gnt.model.Assignment
//@require Ext.data.Store

//@define Gnt.template.Task
//@require Ext.XTemplate

//@define Gnt.template.Milestone
//@require Ext.XTemplate

//@define Gnt.template.ParentTask
//@require Ext.XTemplate

//@define Gnt.Tooltip
//@require Ext.ToolTip
//@require Ext.Template

//@define Gnt.feature.TaskDragDrop
//@require Ext.dd.DragZone
//@require Gnt.Tooltip
//@require Ext.dd.StatusProxy
//@require Ext.dd.ScrollManager

//@define Gnt.feature.DependencyDragDrop
//@require Ext.util.Observable

//@define Gnt.feature.DragCreator
//@require Ext.Template
//@require Sch.util.DragTracker
//@require Gnt.Tooltip

//@define Gnt.feature.LabelEditor
//@require Ext.Editor

//@define Gnt.feature.ProgressBarResize
//@require Ext.QuickTip
//@require Ext.resizer.Resizer

//@define Gnt.feature.TaskResize

//@define Gnt.feature.WorkingTime
//@require Sch.plugin.Zones
//@require Ext.data.Store
//@require Sch.model.Range

//@define Gnt.plugin.DependencyEditor
//@require Ext.form.FormPanel
//@require Ext.form.DisplayField
//@require Ext.form.ComboBox
//@require Ext.form.NumberField
//@require Gnt.model.Dependency

//@define Gnt.plugin.TaskContextMenu
//@require Ext.menu.Menu
//@require Gnt.model.Dependency

//@define Gnt.plugin.PdfExport
//@require Sch.plugin.PdfExport

//@define Gnt.plugin.Printable
//@require Sch.plugin.Printable

//@define Gnt.view.DependencyPainter
//@require Ext.util.Observable
//@require Ext.util.Region

//@define Gnt.view.Dependency
//@require Ext.util.Observable
//@require Gnt.feature.DependencyDragDrop
//@require Gnt.view.DependencyPainter

//@define Gnt.view.Gantt
//@require Sch.view.TimelineTreeView
//@require Gnt.view.Dependency
//@require Gnt.model.Task
//@require Gnt.template.Task
//@require Gnt.template.ParentTask
//@require Gnt.template.Milestone
//@require Gnt.feature.TaskDragDrop
//@require Gnt.feature.ProgressBarResize
//@require Gnt.feature.TaskResize
//@require Sch.view.Horizontal
//@uses Gnt.feature.LabelEditor
//@uses Gnt.feature.DragCreator

//@define Gnt.panel.Gantt
//@require Sch.panel.TimelineTreePanel
//@require Gnt.view.Gantt
//@require Gnt.model.Dependency
//@require Gnt.data.ResourceStore
//@require Gnt.data.AssignmentStore
//@require Gnt.feature.WorkingTime
//@require Gnt.data.Calendar
//@require Gnt.data.TaskStore
//@require Gnt.data.DependencyStore
//@uses Sch.plugin.CurrentTimeLine

//@define Gnt.column.EndDate
//@require Ext.grid.column.Date
//@require Ext.grid.CellEditor

//@define Gnt.column.PercentDone
//@require Ext.grid.column.Number

//@define Gnt.column.StartDate
//@require Ext.grid.column.Date

//@define Gnt.column.WBS
//@require Ext.grid.column.Column

//@define Gnt.column.SchedulingMode
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceAssignment
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceName
//@require Ext.grid.column.Column

//@define Gnt.column.AssignmentUnits
//@require Ext.grid.column.Number

//@define Gnt.widget.AssignmentGrid
//@require Gnt.model.Resource
//@require Gnt.model.Assignment
//@require Gnt.column.ResourceName
//@require Gnt.column.AssignmentUnits
//@require Ext.grid.plugin.CellEditing
//@require Ext.grid.Panel

//@define Gnt.model.AssignmentEditing
//@require Gnt.model.Assignment

//@define Gnt.widget.AssignmentField
//@require Ext.form.field.Picker
//@require Gnt.widget.AssignmentGrid

//@define Gnt.widget.AssignmentCellEditor
//@require Ext.grid.CellEditor
//@require Gnt.model.Assignment
//@require Gnt.widget.AssignmentField

//@define Gnt.widget.DurationField
//@require Ext.form.field.Number

//@define Gnt.widget.DurationEditor
//@require Ext.grid.CellEditor

//@define Gnt.column.Duration
//@require Ext.grid.column.Column
//@require Gnt.widget.DurationField
//@require Gnt.widget.DurationEditor

//@define Gnt.column.Effort
//@require Gnt.column.Duration

//@define Gnt.widget.Calendar
//@require Ext.picker.Date
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayGrid
//@require Ext.grid.Panel

//@define Gnt.widget.calendar.WeekGrid
//@require Ext.grid.Panel
//@require Gnt.model.WeekAvailability

//@define Gnt.widget.calendar.ResourceCalendarGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayAvailabilityGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.WeekEditor
//@require Ext.form.Panel
//@require Ext.grid.*
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DatePicker
//@require Ext.picker.Date

//@define Gnt.widget.calendar.Calendar
//@require Ext.form.Panel
//@require Ext.XTemplate
//@require Gnt.data.Calendar
//@require Gnt.widget.calendar.DayGrid
//@require Gnt.widget.calendar.WeekGrid
//@require Gnt.widget.calendar.DayAvailabilityGrid
//@require Gnt.widget.calendar.WeekEditor
//@require Gnt.widget.calendar.DatePicker

//@define Sch.util.Patch

//@define Sch.patches.LoadMask
//@require Sch.util.Patch
//@require Ext.view.AbstractView

//@define Sch.patches.Table
//@require Sch.util.Patch
//@require Ext.view.Table

//@define Sch.patches.TreeView
//@require Sch.util.Patch
//@require Ext.tree.View

//@define Sch.patches.DataOperation
//@require Sch.util.Patch
//@require Ext.data.Operation

//@define Sch.patches.TreeStore
//@require Sch.util.Patch
//@require Ext.data.TreeStore

//@define Sch.util.Date
//@require Ext.Date

//@define Sch.util.DragTracker
//@require Ext.dd.DragTracker

//@define Sch.util.HeaderRenderers
//@require Sch.util.Date
//@require Ext.XTemplate

//@define Sch.model.Customizable
//@require Ext.data.Model

//@define Sch.patches.Model
//@require Sch.util.Patch
//@require Sch.model.Customizable

//@define Sch.foo
//@require Ext.data.Model

//@define Sch.foo.Sub
//@require Sch.foo

//@define Sch.model.Range
//@require Sch.model.Customizable
//@require Sch.util.Date
//@require Sch.patches.DataOperation

//@define Sch.model.Resource
//@require Sch.model.Customizable

//@define Sch.data.mixin.ResourceStore

//@define Sch.data.ResourceStore
//@require Ext.data.Store

//@define Sch.data.TimeAxis
//@require Ext.util.Observable
//@require Ext.data.JsonStore
//@require Sch.util.Date

//@define Sch.preset.Manager
//@require Ext.util.MixedCollection
//@require Sch.util.Date
//@require Sch.util.HeaderRenderers

//@define Sch.feature.AbstractTimeSpan
//@require Ext.AbstractPlugin

//@define Sch.plugin.Lines
//@require Sch.feature.AbstractTimeSpan

//@define Sch.plugin.Zones
//@require Sch.feature.AbstractTimeSpan
//@require Sch.model.Range

//@define Sch.plugin.Pan
//@require Ext.AbstractPlugin

//@define Sch.view.Locking
//@require Ext.grid.LockingView

//@define Sch.column.Time
//@require Ext.grid.column.Column

//@define Sch.column.timeAxis.Horizontal
//@require Ext.grid.column.Column
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.column.Time
//@require Sch.preset.Manager

//@define Sch.column.timeAxis.HorizontalSingle
//@require Sch.column.Time
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.preset.Manager

//@define Sch.mixin.Lockable
//@require Ext.grid.Lockable
//@require Sch.column.timeAxis.Horizontal
//@require Sch.column.timeAxis.HorizontalSingle

//@define Sch.plugin.TreeCellEditing
//@require Ext.grid.plugin.CellEditing

//@define Sch.feature.ColumnLines
//@require Sch.plugin.Lines
//@require Ext.data.Store

//@define Sch.model.TimeLine
//@require Ext.data.Model

//@define Sch.plugin.CurrentTimeLine
//@require Sch.plugin.Lines

//@define TimeLineEvent
//@require Ext.data.Model

//@define Sch.mixin.TimelineView
//@require Sch.column.Time
//@require Sch.data.TimeAxis

//@define Sch.view.Horizontal

//@define Sch.view.TimelineTreeView
//@require Ext.tree.View
//@require Sch.patches.TreeView

//@define Sch.mixin.Zoomable

//@define Sch.mixin.TimelinePanel
//@require Sch.util.Patch
//@require Sch.patches.LoadMask
//@require Sch.patches.Model
//@require Sch.patches.Table
//@require Sch.data.TimeAxis
//@require Sch.feature.ColumnLines
//@require Sch.view.Locking
//@require Sch.mixin.Lockable
//@require Sch.preset.Manager

//@define Sch.panel.TimelineTreePanel
//@require Ext.tree.Panel
//@require Ext.data.TreeStore

//@define Sch.plugin.Printable
//@require Ext.AbstractPlugin

//@define Sch.plugin.PdfExport
//@require Ext.util.Observable

//@define Sch.widget.ResizePicker
//@require Ext.Panel

//@define Sch.widget.ExportDialogForm
//@require Ext.form.Panel
//@require Sch.widget.ResizePicker

//@define Sch.widget.ExportDialogButtons
//@require Ext.panel.Panel

//@define Sch.widget.PdfExportDialog
//@require Ext.window.Window
//@require Ext.ProgressBar
//@require Sch.widget.ExportDialogForm

//@define Gnt.model.WeekAvailability
//@require Sch.model.Range

//@define Gnt.model.CalendarDay
//@require Ext.data.Types
//@require Sch.model.Customizable

//@define Gnt.model.Assignment
//@require Sch.model.Customizable

//@define Gnt.model.Dependency
//@require Sch.model.Customizable

//@define Gnt.model.Resource
//@require Sch.model.Resource

//@define Gnt.model.task.More

//@define Gnt.model.Task
//@require Sch.model.Range
//@require Sch.util.Date
//@require Ext.data.NodeInterface

//@define Gnt.data.Calendar
//@require Ext.data.Store
//@require Ext.Date
//@require Gnt.model.CalendarDay
//@require Sch.model.Range
//@require Sch.util.Date

//@define Gnt.data.calendar.BusinessTime
//@require Gnt.data.Calendar

//@define Gnt.data.TaskStore
//@require Ext.data.TreeStore
//@require Sch.patches.TreeStore
//@require Gnt.model.Task
//@require Gnt.data.Calendar

//@define Gnt.data.DependencyStore
//@require Ext.data.Store

//@define Gnt.data.ResourceStore
//@require Gnt.model.Resource
//@require Sch.data.ResourceStore

//@define Gnt.data.AssignmentStore
//@require Gnt.model.Assignment
//@require Ext.data.Store

//@define Gnt.template.Task
//@require Ext.XTemplate

//@define Gnt.template.Milestone
//@require Ext.XTemplate

//@define Gnt.template.ParentTask
//@require Ext.XTemplate

//@define Gnt.Tooltip
//@require Ext.ToolTip
//@require Ext.Template

//@define Gnt.feature.TaskDragDrop
//@require Ext.dd.DragZone
//@require Gnt.Tooltip
//@require Ext.dd.StatusProxy
//@require Ext.dd.ScrollManager

//@define Gnt.feature.DependencyDragDrop
//@require Ext.util.Observable

//@define Gnt.feature.DragCreator
//@require Ext.Template
//@require Sch.util.DragTracker
//@require Gnt.Tooltip

//@define Gnt.feature.LabelEditor
//@require Ext.Editor

//@define Gnt.feature.ProgressBarResize
//@require Ext.QuickTip
//@require Ext.resizer.Resizer

//@define Gnt.feature.TaskResize

//@define Gnt.feature.WorkingTime
//@require Sch.plugin.Zones
//@require Ext.data.Store
//@require Sch.model.Range

//@define Gnt.plugin.DependencyEditor
//@require Ext.form.FormPanel
//@require Ext.form.DisplayField
//@require Ext.form.ComboBox
//@require Ext.form.NumberField
//@require Gnt.model.Dependency

//@define Gnt.plugin.TaskContextMenu
//@require Ext.menu.Menu
//@require Gnt.model.Dependency

//@define Gnt.plugin.PdfExport
//@require Sch.plugin.PdfExport

//@define Gnt.plugin.Printable
//@require Sch.plugin.Printable

//@define Gnt.view.DependencyPainter
//@require Ext.util.Observable
//@require Ext.util.Region

//@define Gnt.view.Dependency
//@require Ext.util.Observable
//@require Gnt.feature.DependencyDragDrop
//@require Gnt.view.DependencyPainter

//@define Gnt.view.Gantt
//@require Sch.view.TimelineTreeView
//@require Gnt.view.Dependency
//@require Gnt.model.Task
//@require Gnt.template.Task
//@require Gnt.template.ParentTask
//@require Gnt.template.Milestone
//@require Gnt.feature.TaskDragDrop
//@require Gnt.feature.ProgressBarResize
//@require Gnt.feature.TaskResize
//@require Sch.view.Horizontal
//@uses Gnt.feature.LabelEditor
//@uses Gnt.feature.DragCreator

//@define Gnt.panel.Gantt
//@require Sch.panel.TimelineTreePanel
//@require Gnt.view.Gantt
//@require Gnt.model.Dependency
//@require Gnt.data.ResourceStore
//@require Gnt.data.AssignmentStore
//@require Gnt.feature.WorkingTime
//@require Gnt.data.Calendar
//@require Gnt.data.TaskStore
//@require Gnt.data.DependencyStore
//@uses Sch.plugin.CurrentTimeLine

//@define Gnt.column.EndDate
//@require Ext.grid.column.Date
//@require Ext.grid.CellEditor

//@define Gnt.column.PercentDone
//@require Ext.grid.column.Number

//@define Gnt.column.StartDate
//@require Ext.grid.column.Date

//@define Gnt.column.WBS
//@require Ext.grid.column.Column

//@define Gnt.column.SchedulingMode
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceAssignment
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceName
//@require Ext.grid.column.Column

//@define Gnt.column.AssignmentUnits
//@require Ext.grid.column.Number

//@define Gnt.widget.AssignmentGrid
//@require Gnt.model.Resource
//@require Gnt.model.Assignment
//@require Gnt.column.ResourceName
//@require Gnt.column.AssignmentUnits
//@require Ext.grid.plugin.CellEditing
//@require Ext.grid.Panel

//@define Gnt.model.AssignmentEditing
//@require Gnt.model.Assignment

//@define Gnt.widget.AssignmentField
//@require Ext.form.field.Picker
//@require Gnt.widget.AssignmentGrid

//@define Gnt.widget.AssignmentCellEditor
//@require Ext.grid.CellEditor
//@require Gnt.model.Assignment
//@require Gnt.widget.AssignmentField

//@define Gnt.widget.DurationField
//@require Ext.form.field.Number

//@define Gnt.widget.DurationEditor
//@require Ext.grid.CellEditor

//@define Gnt.column.Duration
//@require Ext.grid.column.Column
//@require Gnt.widget.DurationField
//@require Gnt.widget.DurationEditor

//@define Gnt.column.Effort
//@require Gnt.column.Duration

//@define Gnt.widget.Calendar
//@require Ext.picker.Date
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayGrid
//@require Ext.grid.Panel

//@define Gnt.widget.calendar.WeekGrid
//@require Ext.grid.Panel
//@require Gnt.model.WeekAvailability

//@define Gnt.widget.calendar.ResourceCalendarGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayAvailabilityGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.WeekEditor
//@require Ext.form.Panel
//@require Ext.grid.*
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DatePicker
//@require Ext.picker.Date

//@define Gnt.widget.calendar.Calendar
//@require Ext.form.Panel
//@require Ext.XTemplate
//@require Gnt.data.Calendar
//@require Gnt.widget.calendar.DayGrid
//@require Gnt.widget.calendar.WeekGrid
//@require Gnt.widget.calendar.DayAvailabilityGrid
//@require Gnt.widget.calendar.WeekEditor
//@require Gnt.widget.calendar.DatePicker

//@define Sch.util.Patch

//@define Sch.patches.LoadMask
//@require Sch.util.Patch
//@require Ext.view.AbstractView

//@define Sch.patches.Table
//@require Sch.util.Patch
//@require Ext.view.Table

//@define Sch.patches.TreeView
//@require Sch.util.Patch
//@require Ext.tree.View

//@define Sch.patches.DataOperation
//@require Sch.util.Patch
//@require Ext.data.Operation

//@define Sch.patches.TreeStore
//@require Sch.util.Patch
//@require Ext.data.TreeStore

//@define Sch.util.Date
//@require Ext.Date

//@define Sch.util.DragTracker
//@require Ext.dd.DragTracker

//@define Sch.util.HeaderRenderers
//@require Sch.util.Date
//@require Ext.XTemplate

//@define Sch.model.Customizable
//@require Ext.data.Model

//@define Sch.patches.Model
//@require Sch.util.Patch
//@require Sch.model.Customizable

//@define Sch.foo
//@require Ext.data.Model

//@define Sch.foo.Sub
//@require Sch.foo

//@define Sch.model.Range
//@require Sch.model.Customizable
//@require Sch.util.Date
//@require Sch.patches.DataOperation

//@define Sch.model.Resource
//@require Sch.model.Customizable

//@define Sch.data.mixin.ResourceStore

//@define Sch.data.ResourceStore
//@require Ext.data.Store

//@define Sch.data.TimeAxis
//@require Ext.util.Observable
//@require Ext.data.JsonStore
//@require Sch.util.Date

//@define Sch.preset.Manager
//@require Ext.util.MixedCollection
//@require Sch.util.Date
//@require Sch.util.HeaderRenderers

//@define Sch.feature.AbstractTimeSpan
//@require Ext.AbstractPlugin

//@define Sch.plugin.Lines
//@require Sch.feature.AbstractTimeSpan

//@define Sch.plugin.Zones
//@require Sch.feature.AbstractTimeSpan
//@require Sch.model.Range

//@define Sch.plugin.Pan
//@require Ext.AbstractPlugin

//@define Sch.view.Locking
//@require Ext.grid.LockingView

//@define Sch.column.Time
//@require Ext.grid.column.Column

//@define Sch.column.timeAxis.Horizontal
//@require Ext.grid.column.Column
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.column.Time
//@require Sch.preset.Manager

//@define Sch.column.timeAxis.HorizontalSingle
//@require Sch.column.Time
//@require Ext.Date
//@require Ext.XTemplate
//@require Sch.preset.Manager

//@define Sch.mixin.Lockable
//@require Ext.grid.Lockable
//@require Sch.column.timeAxis.Horizontal
//@require Sch.column.timeAxis.HorizontalSingle

//@define Sch.plugin.TreeCellEditing
//@require Ext.grid.plugin.CellEditing

//@define Sch.feature.ColumnLines
//@require Sch.plugin.Lines
//@require Ext.data.Store

//@define Sch.model.TimeLine
//@require Ext.data.Model

//@define Sch.plugin.CurrentTimeLine
//@require Sch.plugin.Lines

//@define TimeLineEvent
//@require Ext.data.Model

//@define Sch.mixin.TimelineView
//@require Sch.column.Time
//@require Sch.data.TimeAxis

//@define Sch.view.Horizontal

//@define Sch.view.TimelineTreeView
//@require Ext.tree.View
//@require Sch.patches.TreeView

//@define Sch.mixin.Zoomable

//@define Sch.mixin.TimelinePanel
//@require Sch.util.Patch
//@require Sch.patches.LoadMask
//@require Sch.patches.Model
//@require Sch.patches.Table
//@require Sch.data.TimeAxis
//@require Sch.feature.ColumnLines
//@require Sch.view.Locking
//@require Sch.mixin.Lockable
//@require Sch.preset.Manager

//@define Sch.panel.TimelineTreePanel
//@require Ext.tree.Panel
//@require Ext.data.TreeStore

//@define Sch.plugin.Printable
//@require Ext.AbstractPlugin

//@define Sch.plugin.PdfExport
//@require Ext.util.Observable

//@define Sch.widget.ResizePicker
//@require Ext.Panel

//@define Sch.widget.ExportDialogForm
//@require Ext.form.Panel
//@require Sch.widget.ResizePicker

//@define Sch.widget.ExportDialogButtons
//@require Ext.panel.Panel

//@define Sch.widget.PdfExportDialog
//@require Ext.window.Window
//@require Ext.ProgressBar
//@require Sch.widget.ExportDialogForm

//@define Gnt.model.WeekAvailability
//@require Sch.model.Range

//@define Gnt.model.CalendarDay
//@require Ext.data.Types
//@require Sch.model.Customizable

//@define Gnt.model.Assignment
//@require Sch.model.Customizable

//@define Gnt.model.Dependency
//@require Sch.model.Customizable

//@define Gnt.model.Resource
//@require Sch.model.Resource

//@define Gnt.model.task.More

//@define Gnt.model.Task
//@require Sch.model.Range
//@require Sch.util.Date
//@require Ext.data.NodeInterface

//@define Gnt.data.Calendar
//@require Ext.data.Store
//@require Ext.Date
//@require Gnt.model.CalendarDay
//@require Sch.model.Range
//@require Sch.util.Date

//@define Gnt.data.calendar.BusinessTime
//@require Gnt.data.Calendar

//@define Gnt.data.TaskStore
//@require Ext.data.TreeStore
//@require Sch.patches.TreeStore
//@require Gnt.model.Task
//@require Gnt.data.Calendar

//@define Gnt.data.DependencyStore
//@require Ext.data.Store

//@define Gnt.data.ResourceStore
//@require Gnt.model.Resource
//@require Sch.data.ResourceStore

//@define Gnt.data.AssignmentStore
//@require Gnt.model.Assignment
//@require Ext.data.Store

//@define Gnt.template.Task
//@require Ext.XTemplate

//@define Gnt.template.Milestone
//@require Ext.XTemplate

//@define Gnt.template.ParentTask
//@require Ext.XTemplate

//@define Gnt.Tooltip
//@require Ext.ToolTip
//@require Ext.Template

//@define Gnt.feature.TaskDragDrop
//@require Ext.dd.DragZone
//@require Gnt.Tooltip
//@require Ext.dd.StatusProxy
//@require Ext.dd.ScrollManager

//@define Gnt.feature.DependencyDragDrop
//@require Ext.util.Observable

//@define Gnt.feature.DragCreator
//@require Ext.Template
//@require Sch.util.DragTracker
//@require Gnt.Tooltip

//@define Gnt.feature.LabelEditor
//@require Ext.Editor

//@define Gnt.feature.ProgressBarResize
//@require Ext.QuickTip
//@require Ext.resizer.Resizer

//@define Gnt.feature.TaskResize

//@define Gnt.feature.WorkingTime
//@require Sch.plugin.Zones
//@require Ext.data.Store
//@require Sch.model.Range

//@define Gnt.plugin.DependencyEditor
//@require Ext.form.FormPanel
//@require Ext.form.DisplayField
//@require Ext.form.ComboBox
//@require Ext.form.NumberField
//@require Gnt.model.Dependency

//@define Gnt.plugin.TaskContextMenu
//@require Ext.menu.Menu
//@require Gnt.model.Dependency

//@define Gnt.plugin.PdfExport
//@require Sch.plugin.PdfExport

//@define Gnt.plugin.Printable
//@require Sch.plugin.Printable

//@define Gnt.view.DependencyPainter
//@require Ext.util.Observable
//@require Ext.util.Region

//@define Gnt.view.Dependency
//@require Ext.util.Observable
//@require Gnt.feature.DependencyDragDrop
//@require Gnt.view.DependencyPainter

//@define Gnt.view.Gantt
//@require Sch.view.TimelineTreeView
//@require Gnt.view.Dependency
//@require Gnt.model.Task
//@require Gnt.template.Task
//@require Gnt.template.ParentTask
//@require Gnt.template.Milestone
//@require Gnt.feature.TaskDragDrop
//@require Gnt.feature.ProgressBarResize
//@require Gnt.feature.TaskResize
//@require Sch.view.Horizontal
//@uses Gnt.feature.LabelEditor
//@uses Gnt.feature.DragCreator

//@define Gnt.panel.Gantt
//@require Sch.panel.TimelineTreePanel
//@require Gnt.view.Gantt
//@require Gnt.model.Dependency
//@require Gnt.data.ResourceStore
//@require Gnt.data.AssignmentStore
//@require Gnt.feature.WorkingTime
//@require Gnt.data.Calendar
//@require Gnt.data.TaskStore
//@require Gnt.data.DependencyStore
//@uses Sch.plugin.CurrentTimeLine

//@define Gnt.column.EndDate
//@require Ext.grid.column.Date
//@require Ext.grid.CellEditor

//@define Gnt.column.PercentDone
//@require Ext.grid.column.Number

//@define Gnt.column.StartDate
//@require Ext.grid.column.Date

//@define Gnt.column.WBS
//@require Ext.grid.column.Column

//@define Gnt.column.SchedulingMode
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceAssignment
//@require Ext.grid.column.Column

//@define Gnt.column.ResourceName
//@require Ext.grid.column.Column

//@define Gnt.column.AssignmentUnits
//@require Ext.grid.column.Number

//@define Gnt.widget.AssignmentGrid
//@require Gnt.model.Resource
//@require Gnt.model.Assignment
//@require Gnt.column.ResourceName
//@require Gnt.column.AssignmentUnits
//@require Ext.grid.plugin.CellEditing
//@require Ext.grid.Panel

//@define Gnt.model.AssignmentEditing
//@require Gnt.model.Assignment

//@define Gnt.widget.AssignmentField
//@require Ext.form.field.Picker
//@require Gnt.widget.AssignmentGrid

//@define Gnt.widget.AssignmentCellEditor
//@require Ext.grid.CellEditor
//@require Gnt.model.Assignment
//@require Gnt.widget.AssignmentField

//@define Gnt.widget.DurationField
//@require Ext.form.field.Number

//@define Gnt.widget.DurationEditor
//@require Ext.grid.CellEditor

//@define Gnt.column.Duration
//@require Ext.grid.column.Column
//@require Gnt.widget.DurationField
//@require Gnt.widget.DurationEditor

//@define Gnt.column.Effort
//@require Gnt.column.Duration

//@define Gnt.widget.Calendar
//@require Ext.picker.Date
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayGrid
//@require Ext.grid.Panel

//@define Gnt.widget.calendar.WeekGrid
//@require Ext.grid.Panel
//@require Gnt.model.WeekAvailability

//@define Gnt.widget.calendar.ResourceCalendarGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DayAvailabilityGrid
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.WeekEditor
//@require Ext.form.Panel
//@require Ext.grid.*
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.DatePicker
//@require Ext.picker.Date

//@define Gnt.widget.calendar.Calendar
//@require Ext.form.Panel
//@require Ext.XTemplate
//@require Gnt.data.Calendar
//@require Gnt.widget.calendar.DayGrid
//@require Gnt.widget.calendar.WeekGrid
//@require Gnt.widget.calendar.DayAvailabilityGrid
//@require Gnt.widget.calendar.WeekEditor
//@require Gnt.widget.calendar.DatePicker
