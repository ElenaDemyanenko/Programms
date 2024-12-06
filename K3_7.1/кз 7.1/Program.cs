using System;
namespace ConsoleApp

{
    //преобразование строки в число
    public class StringToInt
    {
        public static int Convert(string input)
        {
            return int.Parse(input);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("введите число:");
            string number=Console.ReadLine();
            Console.WriteLine();

            try
            {
                int convertedValue = StringToInt.Convert(number);
                Console.WriteLine($"введённое число: {convertedValue}");
            }

            catch (OverflowException ex)
            {
                Console.WriteLine($"число вне диапазона: {ex.Message}");
            }

            catch (FormatException ex)
            {
                Console.WriteLine($"введено не число: {ex.Message}");
            }
        }
    }
}