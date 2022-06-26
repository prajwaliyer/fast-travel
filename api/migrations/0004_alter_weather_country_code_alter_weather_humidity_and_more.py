# Generated by Django 4.0.5 on 2022-06-26 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_weather_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weather',
            name='country_code',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AlterField(
            model_name='weather',
            name='humidity',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AlterField(
            model_name='weather',
            name='icon',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AlterField(
            model_name='weather',
            name='main',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AlterField(
            model_name='weather',
            name='temp',
            field=models.CharField(default='', max_length=60),
        ),
    ]