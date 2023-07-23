Ext.define('TimesSquare.overrides.DateField', {
    override: 'Ext.form.field.Date',
    format: 'dMy',
    altFormats: 'dmy',
    width: 86,
    invalidText: '{0} is not a valid date - it must be in the format DDMonYY'
});
