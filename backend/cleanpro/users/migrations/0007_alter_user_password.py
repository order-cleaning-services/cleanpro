# Generated by Django 4.2.4 on 2023-08-24 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_alter_user_managers"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(verbose_name="Пароль"),
        ),
    ]
