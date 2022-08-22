package com.calance.moneyquiz.ui

import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.webkit.URLUtil
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import com.calance.moneyquiz.MoneyQuizActivity
import com.calance.moneyquiz.R
import com.calance.moneyquiz.databinding.ActivityDebugScreenBinding

class DebugScreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDebugScreenBinding
    private var progressBar: ProgressBar? = null
    private var continueButton: Button? = null
    private var urlEditText: EditText? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityDebugScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.toolbar)

        progressBar = binding.progressBar
        continueButton = binding.continueBtn
        urlEditText = binding.etUrl

        continueButton?.setOnClickListener {
            val url = urlEditText!!.text.toString().trim { it <= ' ' }

            if (!URLUtil.isValidUrl(url)) {
                showAlertDialog(getString(R.string.invalid_url_alert))
            } else {
                val intent = Intent(this, MoneyQuizActivity::class.java)
                intent.putExtra("EnvUrl", url)
                startActivity(intent)
            }
        }
    }

    private fun showAlertDialog(message: String) {
        if (!isFinishing) {
            val builder = AlertDialog.Builder(this)
            builder.setMessage(message)
                .setCancelable(false)
                .setPositiveButton(
                    getString(R.string.ok)
                ) { dialog: DialogInterface, id: Int -> dialog.dismiss() }
            val alert = builder.create()
            alert.show()
        }
    }
}