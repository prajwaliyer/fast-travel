# Generated by Django 4.0.5 on 2022-07-13 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_attractions_attraction_names'),
    ]

    operations = [
        migrations.RenameField(
            model_name='attractions',
            old_name='name',
            new_name='city',
        ),
        migrations.RemoveField(
            model_name='attractions',
            name='attraction_name',
        ),
        migrations.RemoveField(
            model_name='attractions',
            name='google_url',
        ),
        migrations.RemoveField(
            model_name='attractions',
            name='photo',
        ),
        migrations.RemoveField(
            model_name='attractions',
            name='place_id',
        ),
        migrations.RemoveField(
            model_name='attractions',
            name='rating',
        ),
    ]