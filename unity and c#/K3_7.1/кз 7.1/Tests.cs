using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
namespace ConsoleApp.Tests

{
    [TestClass]
    public class Tests
    {
        [TestMethod]
        public void TestZeroConversion()
        {
            var actualResult = StringToInt.Convert("0");
            Assert.AreEqual(0, actualResult);
        }

        [TestMethod]
        public void TestPositiveBoundaryConversion()
        {
            var actualResult = StringToInt.Convert(int.MaxValue.ToString());
            Assert.AreEqual(int.MaxValue, actualResult);}

        [TestMethod]
        public void TestNegativeBoundaryConversion()
        {
            var actualResult = StringToInt.Convert(int.MinValue.ToString());
            Assert.AreEqual(int.MinValue, actualResult);
        }

        [TestMethod]
        [ExpectedException(typeof(FormatException))]
        public void TestWhitespaceInput()
        {
            StringToInt.Convert(" ");
        }

        [TestMethod]
        [ExpectedException(typeof(FormatException))]
        public void TestMixedCharactersAndNumbers()
        {
            StringToInt.Convert("123abc");
        }

        [TestMethod]
        [ExpectedException(typeof(OverflowException))]
        public void TestExceedingMaxValueByOne()
        {
            unchecked
            {
                StringToInt.Convert((int.MaxValue + 1u).ToString());
            }
        }

        [TestMethod]
        [ExpectedException(typeof(OverflowException))]
        public void TestExceedingMinValueByOne()
        {
            unchecked
            {
                StringToInt.Convert((int.MinValue - 1).ToString());
            }
        }
    }
}