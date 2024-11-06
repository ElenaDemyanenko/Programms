using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1._1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите трёхзначное число");
            int num = int.Parse(Console.ReadLine());

            if (num <= 999 && num >= 100)
            {
                int dec = num / 10 % 10;
                int ed = num % 10;
                int sot = num / 100;

                Console.WriteLine($"Число десятков в {num} равно: {dec}");
                Console.WriteLine($"Число единиц в {num} равно: {ed} ");
                Console.WriteLine($"Сумма цифр {num} равна: {sot + dec + ed}");
                Console.WriteLine($"Произведение цифр { num} равна: {sot * dec* ed}");
            }
            else
                Console.WriteLine("Введите число меньше 999 и больше 99");
        }
    }
}
