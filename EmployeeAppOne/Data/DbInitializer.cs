using EmployeeAppOne.Models;

namespace EmployeeAppOne.Data
{
    public class DbInitializer
    {
        private static Random rand = new Random();
        private static DateTime GetRandBirthDate()
        {
            var rand = new Random();
            var year = rand.Next(1960, 2004);
            var month = rand.Next(1, 12);
            var day = rand.Next(1, DateTime.DaysInMonth(year, month));
            return new DateTime(year, month, day);
        }

        /*
         * @param result - out employees
         * generates initial values for the database
         */
        private static void GenerateSeed(ref Employee[] result)
        {
            result = new Employee[100];


            string[] names =
        {
            "Белоусов Даниил Михайлович",
            "Морозов Степан Тихонович",
            "Морозова Полина Романовна",
            "Нефедова Дарья Глебовна",
            "Бондарев Тимофей Андреевич",
            "Семенова София Артёмовна",
            "Кузнецов Сергей Никитич",
            "Мартынова Варвара Константиновна",
            "Соколов Дамир Романович",
            "Афанасьева Анна Данииловна",
            "Ефремов Максим Егорович",
            "Трифонова Алина Данильевна",
            "Попов Максим Даниилович",
            "Макарова Ирина Платоновна",
            "Новиков Фёдор Алексеевич",
            "Ермолаев Михаил Артёмович",
            "Бородин Даниил Маркович",
            "Лебедев Николай Даниилович",
            "Борисова Ксения Ивановна",
            "Рудаков Максим Михайлович",
            "Воронцов Артём Валерьевич",
            "Ильина Анастасия Дамировна",
            "Аксенов Кирилл Николаевич",
            "Алексеева Амалия Кирилловна",
            "Николаева Елизавета Григорьевна",
            "Бочаров Илья Андреевич",
            "Данилова Анастасия Львовна",
            "Егорова Александра Павловна",
            "Чернов Григорий Кириллович",
            "Овсянников Владимир Ильич",
            "Дмитриев Михаил Лукич",
            "Молчанова Софья Егоровна",
            "Осипов Руслан Игоревич",
            "Королев Михаил Владимирович",
            "Куликова Дарья Михайловна",
            "Иванова Екатерина Александровна",
            "Захарова Валерия Степановна",
            "Ильин Георгий Степанович",
            "Мальцева Анастасия Владимировна",
            "Тимофеев Иван Артёмович",
            "Виноградов Алексей Олегович",
            "Панов Владимир Святославович",
            "Маркова Анна Даниэльевна",
            "Елизаров Роман Иванович",
            "Кондратов Захар Кириллович",
            "Вешняков Мирон Викторович",
            "Зайцев Иван Ярославович",
            "Лебедев Алексей Дмитриевич",
            "Смирнов Пётр Евгеньевич",
            "Булгаков Григорий Ибрагимович",
            "Моисеева София Гордеевна",
            "Ермолаев Степан Кириллович",
            "Иванов Демьян Александрович",
            "Акимова Милана Александровна",
            "Платонов Николай Ярославович",
            "Шапошников Роман Егорович",
            "Кузнецова Алиса Владимировна",
            "Снегирев Иван Алексеевич",
            "Молчанова Вероника Ярославовна",
            "Минина Каролина Никитична",
            "Латышев Кирилл Романович",
            "Леонова Алёна Львовна",
            "Богданова Елизавета Данииловна",
            "Ушакова Полина Львовна",
            "Петров Николай Никитич",
            "Чумакова Александра Александровна",
            "Чернов Савва Романович",
            "Кузнецов Матвей Максимович",
            "Иванов Кирилл Леонидович",
            "Жукова Анастасия Викторовна",
            "Морозова Валерия Никитична",
            "Зубова Светлана Георгиевна",
            "Кольцова Элина Даниэльевна",
            "Назаров Тимофей Тимурович",
            "Серов Адам Никитич",
            "Баженова Мария Максимовна",
            "Медведев Игорь Михайлович",
            "Гаврилов Кирилл Дмитриевич",
            "Уткина Валерия Даниловна",
            "Софронова Кристина Матвеевна",
            "Воронина София Сергеевна",
            "Богданов Гордей Станиславович",
            "Пантелеева Елизавета Александровна",
            "Верещагина Кира Михайловна",
            "Иванова Мария Ивановна",
            "Семенов Сергей Робертович",
            "Миронова Дарья Никитична",
            "Рябов Ярослав Давидович",
            "Сергеев Роман Ильич",
            "Севастьянова Мария Юрьевна",
            "Голубева Виктория Марковна",
            "Куликов Артём Артёмович",
            "Гончаров Дмитрий Тимофеевич",
            "Калмыков Лев Яковлевич",
            "Яковлев Георгий Артёмович",
            "Орлова Анна Артёмовна",
            "Смирнова Елизавета Кирилловна",
            "Иванов Максим Тимофеевич",
            "Абрамов Михаил Ярославович",
            "Громов Александр Евгеньевич"
        };

            string[] emails =
        {
            "o@outlook.com",
            "hr6zdl@yandex.ru",
            "kaft93x@outlook.com",
            "dcu@yandex.ru",
            "19dn@outlook.com",
            "pa5h@mail.ru",
            "281av0@gmail.com",
            "8edmfh@outlook.com",
            "sfn13i@mail.ru",
            "g0orc3x1@outlook.com",
            "rv7bp@gmail.com",
            "93@outlook.com",
            "er@gmail.com",
            "o0my@gmail.com",
            "715qy08@gmail.com",
            "vubx0t@mail.ru",
            "wnhborq@outlook.com",
            "gq@yandex.ru",
            "ic0pu@outlook.com",
            "o7khr@yandex.ru",
            "2shlaq@outlook.com",
            "cdbw@yandex.ru",
            "wrts90puk@yandex.ru",
            "yxunv@gmail.com",
            "7y@yandex.ru",
            "6@mail.ru",
            "k8sjebg1y@mail.ru",
            "jirbold@gmail.com",
            "u7yhwf1vb@mail.ru",
            "f@outlook.com",
            "gjkhp@mail.ru",
            "wyalkxfde@gmail.com",
            "f245n@outlook.com",
            "w@outlook.com",
            "js3kyopz@mail.ru",
            "oklo@outlook.com",
            "uzfd@mail.ru",
            "g@mail.ru",
            "dvjf0@gmail.com",
            "d2mc@outlook.com",
            "06lk@mail.ru",
            "emhzysf2@yandex.ru",
            "d1w28lkg@yandex.ru",
            "t93@mail.ru",
            "t3i@outlook.com",
            "t6ro3@gmail.com",
            "1zqnk0y7@yandex.ru",
            "768ptl4nv@gmail.com",
            "bzq3yh2c1@mail.ru",
            "78k3dvwx@outlook.com",
            "fe8obp@mail.ru",
            "cxh2daw8@outlook.com",
            "lrsdy5p@yandex.ru",
            "2de17h@mail.ru",
            "we3l08z5@gmail.com",
            "i8ovxn2f@gmail.com",
            "q4as80@outlook.com",
            "opu@outlook.com",
            "5iar3l8k@yandex.ru",
            "4zegxla@mail.ru",
            "8lf0g@yandex.ru",
            "1zx8@yandex.ru",
            "x@mail.ru",
            "34d@gmail.com",
            "pxacl@mail.ru",
            "7o1@gmail.com",
            "1@gmail.com",
            "iut@gmail.com",
            "e3t@outlook.com",
            "41clb6o2g@yandex.ru",
            "5hsbm8pi3@mail.ru",
            "dihf8jxk@gmail.com",
            "dwej@yandex.ru",
            "zyue8brv@outlook.com",
            "0a5437@mail.ru",
            "fovtju3q2@yandex.ru",
            "5ntglejc9@outlook.com",
            "61rpbj@mail.ru",
            "9m6pfk52r@outlook.com",
            "gr@yandex.ru",
            "v9dux@gmail.com",
            "mek975vcx@gmail.com",
            "uakvj8p9d@yandex.ru",
            "t3m6u8v@gmail.com",
            "jxqme@gmail.com",
            "c3@gmail.com",
            "3xkgmsd9t@gmail.com",
            "s9iw@mail.ru",
            "qo2sc@mail.ru",
            "xiuq5olft@gmail.com",
            "8swlo27hd@outlook.com",
            "r0o6f92@gmail.com",
            "z@gmail.com",
            "r3p4mgf5@yandex.ru",
            "p@outlook.com",
            "61j@yandex.ru",
            "t2sr@gmail.com",
            "u7@outlook.com",
            "9k15qr2h@gmail.com",
            "3vmtdo1@outlook.com",
            "q9@mail.ru"
        };

            for (int i = 0; i < names.Length & i < result.Length; i++)
            {
                result[i] = new Employee()
                    {
                        Name = names[i],
                        Email = emails[i],
                        BirthDate = GetRandBirthDate(),
                        Salary = rand.Next(40, 350) * 1000,
                        LastModifiedDate = DateTime.Now
                    };
            }
        }

        public static void Initialize(EmployeeAppContext dbContext)
        {
            if (dbContext.Employees.Any())
                return; // DB Has been seeded

            var employees = new Employee[100];
            GenerateSeed(ref employees);

            dbContext.Employees.AddRange(employees);
            dbContext.SaveChanges();
        }
    }
}
