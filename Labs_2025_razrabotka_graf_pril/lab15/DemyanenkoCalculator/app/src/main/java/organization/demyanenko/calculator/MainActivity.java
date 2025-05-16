package organization.demyanenko.calculator;

import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import organization.demyanenko.calculator.R;

public class MainActivity extends AppCompatActivity {
    String oldNumber = "";
    String operator = "";

    boolean isNewOperator = true;
    TextView resultTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        resultTextView = findViewById(R.id.resultTextView);

    }
    public void numberEvent(View view){
        if (isNewOperator ) {
            resultTextView.setText("");
        }
        isNewOperator = false;

        String number = resultTextView.getText().toString();
        if (view.getId() == R.id.bu1){
            number = number + "1";

        }
        else if (view.getId() == R.id.bu2){
            number = number + "2";
        }
        else if (view.getId() == R.id.bu3){
            number = number + "3";
        }
        else if (view.getId() == R.id.bu4){
            number = number + "4";
        }
        else if (view.getId() == R.id.bu5){
            number = number + "5";
        }
        else if (view.getId() == R.id.bu6){
            number = number + "6";
        }
        else if (view.getId() == R.id.bu7){
            number = number + "7";
        }
        else if (view.getId() == R.id.bu8){
            number = number + "8";
        }
        else if (view.getId() == R.id.bu9){
            number = number + "9";
        }
        else if (view.getId() == R.id.bu0){
            number = number + "0";
        }
        else if (view.getId() == R.id.buDot){
            number = number + ".";
        }
        else if (view.getId() == R.id.buPlusMinus) {
            if (number.startsWith("-")) {
                number = number.substring(1);
            } else {
                number = "-" + number;
            }
        }
        resultTextView.setText(number);
    }

    public void operatorEvent(View view) {
        isNewOperator = true;
        oldNumber = resultTextView.getText().toString();

        if (view.getId() == R.id.buPlus) {
            operator = "+";
        } else if (view.getId() == R.id.buMinus) {
            operator = "-";
        }else if (view.getId() == R.id.buMultipy) {
            operator = "*";
        } else if (view.getId() == R.id.buDivide) {
            operator = "/";
        }

    }

    public void equalEvent(View view) {
        String newNumber = resultTextView.getText().toString();
        double result = 0.0;

        if (operator == "+") {
            result = Double.parseDouble(oldNumber) + Double.parseDouble(newNumber);
        } else if (operator == "-") {
            result = Double.parseDouble(oldNumber) - Double.parseDouble(newNumber);
        } else if (operator == "*") {
            result = Double.parseDouble(oldNumber) * Double.parseDouble(newNumber);
        } else if (operator == "/") {
            result = Double.parseDouble(oldNumber) / Double.parseDouble(newNumber);
        }
        resultTextView.setText(result + "");
        isNewOperator = true;
    }

    public void acEvent(View view) {
        resultTextView.setText("0");
        isNewOperator = true;
    }
}