# Generated by Django 4.0.5 on 2022-07-12 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_attractions_attraction_names'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attractions',
            name='attraction_names',
            field=models.JSONField(default=dict),
        ),
    ]