# Generated by Django 4.1.5 on 2023-06-13 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('value', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
    ]
