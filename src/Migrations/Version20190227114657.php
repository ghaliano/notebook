<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190227114657 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact DROP viber, DROP phone_num, CHANGE photo photo VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE number DROP FOREIGN KEY FK_96901F5449D16855');
        $this->addSql('DROP INDEX IDX_96901F5449D16855 ON number');
        $this->addSql('ALTER TABLE number ADD contact_id INT NOT NULL, ADD num VARCHAR(255) DEFAULT NULL, DROP one_num_id');
        $this->addSql('ALTER TABLE number ADD CONSTRAINT FK_96901F54E7A1254A FOREIGN KEY (contact_id) REFERENCES contact (id)');
        $this->addSql('CREATE INDEX IDX_96901F54E7A1254A ON number (contact_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact ADD viber VARCHAR(50) NOT NULL COLLATE utf8mb4_unicode_ci, ADD phone_num INT NOT NULL, CHANGE photo photo LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE number DROP FOREIGN KEY FK_96901F54E7A1254A');
        $this->addSql('DROP INDEX IDX_96901F54E7A1254A ON number');
        $this->addSql('ALTER TABLE number ADD one_num_id INT DEFAULT NULL, DROP contact_id, DROP num');
        $this->addSql('ALTER TABLE number ADD CONSTRAINT FK_96901F5449D16855 FOREIGN KEY (one_num_id) REFERENCES contact (id)');
        $this->addSql('CREATE INDEX IDX_96901F5449D16855 ON number (one_num_id)');
    }
}
