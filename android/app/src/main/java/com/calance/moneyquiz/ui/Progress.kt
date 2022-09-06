package com.calance.moneyquiz.ui

import android.app.AlertDialog
import android.app.Dialog
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.widget.TextView
import androidx.annotation.StringRes
import com.calance.moneyquiz.R

/**
 * Author : Arjun Singh on 02-08-2022.
 * Role : Technical Lead.
 * Organisation : Calance Software Pvt. Ltd..
 * Contact : Arjun.Singh@calance.com/arjun.singh5538@gmail.com
 */

class Progress constructor(
    context: Context?,
    @StringRes private val titleRes: Int,
    cancelable: Boolean = false
) {

    private var view: View? = null
    private var builder: AlertDialog.Builder
    private var dialog: Dialog

    init {
        view = LayoutInflater.from(context).inflate(R.layout.progress, null)
        view?.findViewById<TextView>(R.id.text)?.setText(titleRes)
        builder = AlertDialog.Builder(context)
        builder.setView(view)
        dialog = builder.create()
        dialog.setCancelable(cancelable)
    }

    fun setProgressMessage(@StringRes titleRes: Int) {
        view?.findViewById<TextView>(R.id.text)?.setText(titleRes)
    }

    fun show() {
        dialog.show()
    }

    fun dismiss() {
        if (dialog.isShowing) {
            dialog.dismiss()
        }
    }

    fun setProgressDialogVisibility(isVisible: Boolean) {

    }
}