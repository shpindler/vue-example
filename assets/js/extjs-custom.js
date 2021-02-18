/* eslint-disable */

export default function () {
  const Ext = window.Ext

  const _ExtComponentUpdate = Ext.Component.prototype.update
  Ext.override(Ext.Component, {
    update() {
      if (!this.getContentTarget()) return
      return _ExtComponentUpdate.apply(this, arguments)
    }
  })

  const _ExtM3AdvancedComboBoxGetWidth =
    Ext.m3.AdvancedComboBox.prototype.getWidth
  const _ExtM3AdvancedComboBoxSetReadOnly =
    Ext.m3.AdvancedComboBox.prototype.setReadOnly
  Ext.override(Ext.m3.AdvancedComboBox, {
    getWidth() {
      if (!this.el) return
      return _ExtM3AdvancedComboBoxGetWidth.apply(this, arguments)
    },
    setReadOnly() {
      if (!this.el) return
      return _ExtM3AdvancedComboBoxSetReadOnly.apply(this, arguments)
    }
  })

  const _ExtLoadMask = Ext.LoadMask
  Ext.LoadMask = new Proxy(_ExtLoadMask, {
    construct(target, argumentsList) {
      if (!argumentsList[0]) {
        argumentsList[0] = document.body
      }
      return new target(...argumentsList)
    }
  })

  const _restoreClass = restoreClass
  window.restoreClass = new Proxy(_restoreClass, {
    apply(target, thisArg, argumentsList) {
      if (!thisArg.el) return
      return target.apply(thisArg, argumentsList)
    }
  })

  Ext.override(Ext.form.Field, {
    setFieldLabel(text) {
      if (text !== undefined) {
        if (this.rendered) {
          let newText = text + ':'
          if (this.isModified) {
            newText = `<span style="color:var(--secondary);">${newText}</span>`
          }
          const lab = this.el.up('.x-form-item', 10, true)
          if (lab) {
            lab.child('.x-form-item-label').update(newText)
          }
        }
        this.fieldLabel = text
      }
    }
  })

  function stringToDate(value) {
    return new Date(
      ...value.split('.').reverse().map((t, i) => {
        return i === 1 ? parseInt(t) - 1 : parseInt(t)
      })
    )
  }

  const _ExtM3AdvancedDataFieldInitTrigger =
    Ext.m3.AdvancedDataField.prototype.initTrigger
  Ext.override(Ext.m3.AdvancedDataField, {
    initComponent() {
      Ext.m3.AdvancedDataField.superclass.initComponent.call(this)
      this.addClass('x-form-advanced-date-field')
      this.baseTriggers = [
        {
          iconCls: 'x-form-date-trigger',
          handler: this.onTriggerClick,
          hide: null
        },
        {
          iconCls: 'x-form-increment-date',
          handler: () => {
            if (this.readOnly || this.disabled) return
            let nextDay = this.getValue() || new Date()
            if (typeof nextDay === 'string') {
              nextDay = stringToDate(nextDay)
            }
            nextDay.setDate(nextDay.getDate() + 1)
            this.setValue(nextDay)
            this.fireEvent('select', this, nextDay)
          },
          hide: null
        },
        {
          iconCls: 'x-form-decrement-date',
          handler: () => {
            if (this.readOnly || this.disabled) return
            let prevDay = this.getValue() || new Date()
            if (typeof prevDay === 'string') {
              prevDay = stringToDate(prevDay)
            }
            prevDay.setDate(prevDay.getDate() - 1)
            this.setValue(prevDay)
            this.fireEvent('select', this, prevDay)
          },
          hide: null
        }
      ]
      this.triggerConfig = { tag: 'span', cls: 'x-form-twin-triggers', cn: [] }
      Ext.each(this.baseTriggers, ({ iconCls }) => {
        this.triggerConfig.cn.push({
          tag: 'img',
          src: Ext.BLANK_IMAGE_URL,
          cls: `x-form-trigger ${iconCls}`
        })
      }, this)
    },
    initTrigger() {
      if (!this.trigger) return
      return _ExtM3AdvancedDataFieldInitTrigger.apply(this, arguments)
    }
  })

  const _ExtM3AdvancedDataField = Ext.m3.AdvancedDataField
  Ext.m3.AdvancedDataField = new Proxy(_ExtM3AdvancedDataField, {
    construct(target, argumentsList) {
      return new target(
        { ...argumentsList[0], hideTrigger: true },
        ...argumentsList.slice(1, argumentsList.length)
      )
    }
  })

  const _ExtDatePickerSetValue = Ext.DatePicker.prototype.setValue
  Ext.override(Ext.DatePicker, {
    setValue(value) {
      if (typeof value === 'string') {
        value = stringToDate(value)
      }
      _ExtDatePickerSetValue.call(this, value)
    }
  })

  const _ExtM3AdvancedComboBoxInitComponent =
    Ext.m3.AdvancedComboBox.prototype.initComponent
  Ext.override(Ext.m3.AdvancedComboBox, {
    initComponent() {
      this.addClass('x-form-advanced-combobox-field')
      return _ExtM3AdvancedComboBoxInitComponent.apply(this, arguments)
    },
    initTrigger() {
      const ts = this.trigger.select('.x-form-trigger', true)
      ts.each((t, _, index) => {
        const triggerIndex = `Trigger${index + 1}`
        t.hide = () => {
          let w = this.wrap.getWidth()
          t.addClass('hidden')
          if (w === 0) {
            this[`hidden${triggerIndex}`] = true
          }
        }
        t.show = () => {
          t.removeClass('hidden')
          this[`hidden${triggerIndex}`] = false
        }
        if (this.allTriggers[index].hide) {
          t.addClass('hidden')
          this[`hidden${triggerIndex}`] = true
        }
      }, this)
      this.disableTriggers(this.disabled)
      this.triggers = ts.elements
    },
    getTriggerWidth() {
      return 0
    },
    getWidth() {
      return this.el.getWidth()
    }
  })

  const _ExtAppFormSearchFieldInitComponent =
    Ext.app.form.SearchField.prototype.initComponent
  const _ExtAppFormSearchFieldOnTrigger1Click =
    Ext.app.form.SearchField.prototype.onTrigger1Click
  const _ExtAppFormSearchFieldOnTrigger2Click =
    Ext.app.form.SearchField.prototype.onTrigger2Click
  Ext.override(Ext.app.form.SearchField, {
    initComponent() {
      this.on('afterrender', () => {
        if (this.triggers && this.triggers.length) {
          this.triggers[0].addClass('hidden')
        }
      })
      return _ExtAppFormSearchFieldInitComponent.apply(this, arguments)
    },
    onTrigger1Click() {
      if (this.rendered) {
        this.triggers[0].addClass('hidden')
      }
      return _ExtAppFormSearchFieldOnTrigger1Click.apply(this, arguments)
    },
    onTrigger2Click() {
      if (this.rendered && this.getValue()) {
        this.triggers[0].removeClass('hidden')
      }
      return _ExtAppFormSearchFieldOnTrigger2Click.apply(this, arguments)
    }
  })

  const _ExtUxFormFileUploadFieldBindListeners =
    Ext.ux.form.FileUploadField.prototype.bindListeners
  Ext.override(Ext.ux.form.FileUploadField, {
    bindListeners() {
      this.buttonClear.getWidth = () => 0
      return _ExtUxFormFileUploadFieldBindListeners.apply(this, arguments)
    },
    onResize(w, h) {
      Ext.ux.form.FileUploadField.superclass.onResize.call(this, w, h)
      this.wrap.setWidth(w)
      if (!this.buttonOnly) {
        this.el.setWidth(this.wrap.getWidth())
      }
    }
  })

  Ext.override(Ext.m3.MultiSelectField, {
    initComponent() {
      this.checkedItems = []
      this.hideTriggerDictEdit = true
      this.displayField = this.displayField || 'name'
      this.defaultValue = Ext.decode(this.defaultValue)
      if (!this.tpl) {
        this.tpl =
          '<tpl for="."><div class="x-combo-list-item x-multi-combo-item">' +
          '<div class="{[this.getImgClass(values)]}"></div>' +
          '<div>{' + this.displayField + '}</div></div></tpl>'
        this.tpl = new Ext.XTemplate(this.tpl, {
          getImgClass: this.getCheckboxCls.createDelegate(this)
        })
      }
      Ext.m3.MultiSelectField.superclass.initComponent.apply(this)
    }
  })
}
